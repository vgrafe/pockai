import { ScrollView, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { callWhisperWithAudioUrl } from "@/lib/voice-to-text";
import { callChatGPTWithConvo } from "@/lib/completion";
import {
  callElevenLabsWithText,
  sayWithSystemSpeech,
} from "@/lib/text-to-speech";
import { playSound, useRecorder } from "@/lib/audio";
import { systemPrompt } from "@/lib/defaultPersona";
import { Bubble } from "@/components/Bubble";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiTokens } from "@/lib/secureStore";
import { Link } from "expo-router";
import { Text } from "@/components/Text";

// const CHATGPT_35_COST_PER_TOKEN = 0.000002;
// const WHISPER_COST_PER_MINUTE = 0.006;

const Recorder = () => {
  const [minutesUsed, setMinutesUsed] = useState(0);
  const [error, setError] = useState<string>();
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

  const [status, setStatus] = useState<
    "ready" | "understanding" | "answering" | "vocalizing" | "speaking"
  >("ready");

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

      setStatus("understanding");
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

      setStatus("answering");

      const gptAnswer = await callChatGPTWithConvo(newChatLines, openAi);
      const response = gptAnswer.choices[0].message.content;

      // const gptCost = Math.round(totalCost);

      // await AsyncStorage.setItem("totalCost", (totalCost + gptCost).toString());
      // setTotalCost((t) => t + gptCost);

      setChatLines((c) => [...c, { role: "assistant", content: response }]);

      if (elevenLabs && elevenLabs.length > 0) {
        setStatus("vocalizing");
        try {
          const _audioBlob = await callElevenLabsWithText(response, elevenLabs);
          setAudioBlob(_audioBlob);
          setStatus("speaking");
          await playSound(_audioBlob);
        } catch (e: any) {
          setError(e.message);
          await sayWithSystemSpeech(response);
        }
      } else await sayWithSystemSpeech(response);

      setStatus("ready");
    },
  });

  const actualChatLines = chatLines.filter((a) => a.role !== "system");

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [actualChatLines.length, actualChatLines.at(-1)?.content]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: "5%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!openAi && (
        <>
          <Text style={{ marginBottom: 16 }}>
            please set your api keys in settings
          </Text>
          <Link href="/settings">
            <Text style={{ marginBottom: 16 }}>go to settings</Text>
          </Link>
        </>
      )}
      {actualChatLines.length === 0 && (
        <Text style={{ marginTop: "30%", fontSize: 24, textAlign: "center" }}>
          press and hold the button, talk to me, then release
        </Text>
      )}
      <ScrollView
        ref={scrollRef}
        style={{ display: "flex", width: "100%", maxWidth: 500 }}
      >
        {actualChatLines.map((line, i) => (
          <Bubble
            key={i}
            alignSelf={line.role === "user" ? "flex-end" : "flex-start"}
            backgroundColor={line.role === "user" ? "blue" : "gray"}
            onPress={async () => {
              if (
                audioBlob &&
                i == actualChatLines.length - 1 &&
                status === "ready"
              ) {
                setStatus("speaking");
                await playSound(audioBlob);
                setStatus("ready");
              }
            }}
          >
            {line.content}
          </Bubble>
        ))}
        {status === "answering" && (
          <Bubble alignSelf="flex-start" backgroundColor="gray">
            ...
          </Bubble>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          backgroundColor: recording
            ? "rgba(0,0,200,0.75)"
            : "rgba(0,0,200,0.5)",
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
      {/* <Text>{status}</Text> */}
      <Text>{error}</Text>
    </SafeAreaView>
  );
};

export default Recorder;
