import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { callWhisperWithAudioUrl } from "@/lib/voice-to-text";
import { callChatGPTWithConvo } from "@/lib/completion";
import {
  callElevenLabsWithText,
  sayWithSystemSpeech,
} from "@/lib/text-to-speech";
import { playSound, useRecorder } from "@/lib/audio";
import { systemPrompt } from "@/lib/defaultPersona";
import { Bubble, Text } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiTokens } from "@/lib/secureStore";

// const CHATGPT_35_COST_PER_TOKEN = 0.000002;
// const WHISPER_COST_PER_MINUTE = 0.006;

const Recorder = () => {
  const [minutesUsed, setMinutesUsed] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const [openAi, elevenLabs] = useApiTokens((a) => [a.openAi, a.elevenLabs]);

  useEffect(() => {
    const loadTokenUse = async () => {
      const tokenUse = await AsyncStorage.getItem("tokenUse");
      setTokensUsed(parseInt(tokenUse?.toString() || "0"));
    };
    loadTokenUse();
  }, []);

  const [status, setStatus] = useState<"ready" | "thinking" | "speaking">(
    "ready"
  );

  const [chatLines, setChatLines] = useState<ChatCompletionRequestMessage[]>([
    {
      role: "system",
      content: systemPrompt,
    },
  ]);

  const { startRecording, stopRecording, recording } = useRecorder({
    onSoundRecorded: async (recording, minutes) => {
      await AsyncStorage.setItem(
        "minutesUsed",
        (minutesUsed + minutes).toString()
      );
      setMinutesUsed((t) => t + minutes);

      setStatus("thinking");
      const uri = recording.getURI();

      if (!uri || !openAi) {
        setStatus("ready");
        return;
      }

      let transcription: string;
      try {
        transcription = (await callWhisperWithAudioUrl(uri, openAi)).text;
      } catch (e) {
        console.log(e);
        setStatus("ready");
        return;
      }

      const newChatLine = {
        role: "user",
        content: transcription,
      } satisfies ChatCompletionRequestMessage;

      const newChatLines = [...chatLines, newChatLine];

      setChatLines(newChatLines);

      const gptAnswer = await callChatGPTWithConvo(newChatLines, openAi);
      const response = gptAnswer.choices[0].message.content;

      // const gptCost = Math.round(totalCost);

      // await AsyncStorage.setItem("totalCost", (totalCost + gptCost).toString());
      // setTotalCost((t) => t + gptCost);

      setChatLines((c) => [...c, { role: "assistant", content: response }]);

      if (elevenLabs && elevenLabs.length > 0) {
        const _audioBlob = await callElevenLabsWithText(response, elevenLabs);
        setAudioBlob(_audioBlob);
        setStatus("speaking");
        await playSound(_audioBlob);
        setStatus("ready");
      } else sayWithSystemSpeech(response);
    },
  });

  const actualChatLines = chatLines.filter((a) => a.role !== "system");

  let lastLine = actualChatLines.at(-1)?.content;
  if (!lastLine) {
    if (!openAi) lastLine = "please set your api keys in settings";
    else lastLine = "press the button, speak, then release";
  }

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [actualChatLines.length, lastLine]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 96,
        marginBottom: 24,
        marginHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        ref={scrollRef}
        style={{ display: "flex", width: "100%", maxWidth: 500 }}
      >
        {actualChatLines.map((line, i) => (
          <Bubble
            key={i}
            alignSelf={line.role === "user" ? "flex-end" : "flex-start"}
            backgroundColor={line.role === "user" ? "blue" : "gray"}
          >
            <Text
              style={{
                fontSize: 18,
              }}
              onPress={() => {
                if (audioBlob && i == actualChatLines.length - 1)
                  playSound(audioBlob);
              }}
            >
              {line.content}
            </Text>
          </Bubble>
        ))}
        {status === "thinking" && (
          <Bubble alignSelf="flex-start" backgroundColor="gray">
            <Text style={{ fontSize: 18 }}>...</Text>
          </Bubble>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          backgroundColor: recording
            ? "rgba(255,0,0,0.5)"
            : "rgba(255,0,0,0.25)",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={status !== "ready" || !openAi}
        onPressIn={() => {
          if (status === "ready") startRecording();
        }}
        onPressOut={() => {
          if (status === "ready") stopRecording();
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Recorder;
