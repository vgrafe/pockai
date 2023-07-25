import { ScrollView, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { callWhisperWithAudioUrl } from "@/lib/voice-to-text";
import { callChatGPTWithConvo } from "@/lib/completion";
import {
  callElevenLabsWithText,
  sayWithSystemSpeech,
} from "@/lib/text-to-speech";
import { playSound, useRecorder } from "@/lib/audio";
import { systemPrompt } from "@/lib/defaultPersona";
// import { TapGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useApiTokens } from "@/lib/secureStore";
// import { set } from "react-native-reanimated";
// import { Airplay } from "@tamagui/lucide-icons";

// const CHATGPT_35_COST_PER_TOKEN = 0.000002;
// const WHISPER_COST_PER_MINUTE = 0.006;

const Recorder = () => {
  const [minutesUsed, setMinutesUsed] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);

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

      if (!uri) {
        setStatus("ready");
        return;
      }

      const transcription = await callWhisperWithAudioUrl(uri, openAi);

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
        const audioBlob = await callElevenLabsWithText(response, elevenLabs);
        setStatus("speaking");
        await playSound(audioBlob);
        setStatus("ready");
      } else sayWithSystemSpeech(response);
    },
  });

  // const eventHandler = useAnimatedGestureHandler({
  //   onStart: (event, ctx) => {
  //     if (status === "ready") {
  //       pressed.value = true;
  //       runOnJS(startRecording)();
  //     }
  //   },
  //   onEnd: (event, ctx) => {
  //     if (status === "ready") {
  //       pressed.value = false;
  //       runOnJS(stopRecording)();
  //     }
  //   },
  // });
  // const uas = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: withSpring(pressed.value ? "#F00F86" : "#001972"),
  //     transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }],
  //   };
  // });

  const lastLine = chatLines.filter((a) => a.role !== "system").at(-1)?.content;

  return (
    <View
      style={{
        flex: 1,
        margin: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {lastLine || "press the button, speak, then release"}
        </Text>
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
        disabled={status !== "ready"}
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
      <MonoText>{status}</MonoText>
    </View>
  );
};
export default Recorder;
