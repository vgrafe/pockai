import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { callWhisperWithAudioUrl } from "../lib/voice-to-text";
import { callChatGPTWithConvo } from "../lib/completion";
import {
  callElevenLabsWithText,
  sayWithSystemSpeech,
} from "../lib/text-to-speech";
import { playSound, useRecorder } from "../lib/audio";
import { systemPrompt } from "../lib/defaultPersona";
// import { TapGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, YStack } from "tamagui";
import * as SecureStore from "expo-secure-store";
// import { set } from "react-native-reanimated";
// import { Airplay } from "@tamagui/lucide-icons";

// const CHATGPT_35_COST_PER_TOKEN = 0.000002;
// const WHISPER_COST_PER_MINUTE = 0.006;

const Recorder = () => {
  const [minutesUsed, setMinutesUsed] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);

  useEffect(() => {
    const loadTokenUse = async () => {
      const tokenUse = await AsyncStorage.getItem("tokenUse");
      setTokensUsed(parseInt(tokenUse) || 0);
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
      const openAi = await SecureStore.getItemAsync("OPENAI_API_KEY");

      await AsyncStorage.setItem(
        "minutesUsed",
        (minutesUsed + minutes).toString()
      );
      setMinutesUsed((t) => t + minutes);

      setStatus("thinking");
      const uri = recording.getURI();

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

      const elevenLabs = await SecureStore.getItemAsync("ELEVENLABS_API_KEY");

      if (elevenLabs.length > 0) {
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
    <YStack
      flex={1}
      py={80}
      px={40}
      alignItems="center"
      justifyContent="space-around"
    >
      <ScrollView>
        <Text fontSize={24} textAlign="center">
          {lastLine || "press the button, speak, then release"}
        </Text>
      </ScrollView>
      <Button
        alignSelf="center"
        backgroundColor={recording ? "rgba(255,0,0,0.5)" : "rgba(255,0,0,0.25)"}
        size="$12"
        borderRadius={100}
        onTouchStart={() => {
          if (status === "ready") startRecording();
        }}
        onTouchEnd={() => {
          if (status === "ready") stopRecording();
        }}
      />
    </YStack>
  );
};
export default Recorder;
