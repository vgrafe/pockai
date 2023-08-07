import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  useColorScheme,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { callWhisperWithAudioUrl } from "@/lib/voice-to-text";
import { callChatGPTWithConvo } from "@/lib/completion";
import {
  callElevenLabsWithText,
  sayWithSystemSpeech,
} from "@/lib/text-to-speech";
import { playSound, useRecorder } from "@/lib/audio";
import { Bubble } from "@/components/Bubble";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSecureStore } from "@/lib/secureStore";
import { useRouter } from "expo-router";
import { Text } from "@/components/Text";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { Button } from "@/components/Button";
import { styles } from "@/lib/styles";
import { useAsyncStore } from "@/lib/asyncStore";
import { TextInput } from "@/components/TextInput";
import { KeyboardIcon, Mic2, Send } from "lucide-react-native";
import { useThemeColor } from "@/lib/theme";

// const CHATGPT_35_COST_PER_TOKEN = 0.000002;
// const WHISPER_COST_PER_MINUTE = 0.006;

const Recorder = () => {
  const [minutesUsed, setMinutesUsed] = useState(0);
  const [error, setError] = useState<string>();
  const [tokensUsed, setTokensUsed] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const { currentContact, updateContact } = useCurrentContact();

  const [openAi, elevenLabs] = useSecureStore((a) => [a.openAi, a.elevenLabs]);

  const [keyboardText, setKeyboardText] = useState("");

  const [speakBack, useMicrophone, setUseMicrophone] = useAsyncStore((a) => [
    a.speakBack,
    a.useMicrophone,
    a.setUseMicrophone,
  ]);

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

  const [textColor, placeholderTextColor] = useThemeColor([
    {
      colorName: "text",
    },
    {
      colorName: "placeholderText",
    },
  ]);

  const sendUserChat = async (chat: string) => {
    const newChatLine = {
      role: "user",
      content: chat,
    } satisfies ChatCompletionRequestMessage;

    const newChatLines = [...currentContact!.history, newChatLine];

    updateContact({
      ...currentContact!,
      history: newChatLines,
    });

    setStatus("answering");

    let response;
    try {
      response = await callChatGPTWithConvo(newChatLines, openAi);
    } catch (e: any) {
      setError(
        "An error happened when calling OpenAI. Please verify your API key and try again."
      );
      setStatus("ready");
      return;
    }

    // const gptCost = Math.round(totalCost);

    // await AsyncStorage.setItem("totalCost", (totalCost + gptCost).toString());
    // setTotalCost((t) => t + gptCost);

    updateContact({
      ...currentContact!,
      history: [...newChatLines, { role: "assistant", content: response }],
    });

    if (speakBack)
      if (elevenLabs && elevenLabs.length > 0) {
        setStatus("vocalizing");
        try {
          const _audioBlob = await callElevenLabsWithText(
            response,
            elevenLabs,
            currentContact!.voiceId
          );
          setAudioBlob(_audioBlob);
          setStatus("speaking");
          await playSound(_audioBlob);
        } catch (e: any) {
          setError(
            "An error happened when calling Elevenlabs; defaulting to your system speech synthesis instead. Please verify your API key and try again."
          );
          await sayWithSystemSpeech(response);
        }
      } else await sayWithSystemSpeech(response);

    setStatus("ready");
  };

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

      sendUserChat(transcription);
    },
  });

  const actualChatLines = currentContact?.history.filter(
    (a) => a.role !== "system"
  );

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [actualChatLines?.length, actualChatLines?.at(-1)?.content]);

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={[
        styles.container,
        {
          alignItems: "center",
          marginHorizontal: "auto",
        },
      ]}
      behavior="padding"
    >
      {!openAi ? (
        <>
          <Text style={{ marginBottom: 16 }}>
            please set your api keys in settings
          </Text>
          <Button
            style={{ marginBottom: 16 }}
            onPress={() => router.push("/settings")}
            title="go to settings"
          />
        </>
      ) : (
        <>
          {actualChatLines?.length === 0 && (
            <Text
              style={{
                marginTop: "10%",
                marginHorizontal: "5%",
                textAlign: "center",
              }}
            >
              This is the beginning of your conversation with{" "}
              {currentContact?.name}. Press and hold the button, talk, then
              release the button.
            </Text>
          )}
          <ScrollView ref={scrollRef} style={{ flex: 1, width: "100%" }}>
            {actualChatLines?.map((line, i) => (
              <Bubble
                key={i}
                alignSelf={line.role === "user" ? "flex-end" : "flex-start"}
                backgroundColor={line.role === "user" ? "blue" : "gray"}
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
          {error && (
            <Text
              variant="danger"
              style={{
                marginVertical: 8,
              }}
            >
              {error}
            </Text>
          )}
          {useMicrophone ? (
            <View style={{ position: "relative", width: "80%", marginTop: 12 }}>
              <Pressable
                hitSlop={10}
                style={{ position: "absolute", bottom: "50%", left: 0 }}
                onPress={() => setUseMicrophone(false)}
              >
                <KeyboardIcon color={textColor} />
              </Pressable>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: recording
                    ? "rgba(0,0,200,0.75)"
                    : "rgba(0,0,200,0.5)",
                  borderRadius: 50,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
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
          ) : (
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                gap: 12,
                alignSelf: "stretch",
                alignItems: "center",
                marginBottom: 32,
                marginHorizontal: 12,
              }}
            >
              <Pressable hitSlop={10} onPress={() => setUseMicrophone(true)}>
                <Mic2 color={textColor} />
              </Pressable>
              <TextInput
                placeholder="type something here"
                style={{
                  flex: 1,
                  color: keyboardText.length ? textColor : placeholderTextColor,
                }}
                value={keyboardText}
                onChangeText={setKeyboardText}
                onSubmitEditing={() => {
                  sendUserChat(keyboardText);
                  setKeyboardText("");
                }}
              />
              <Pressable
                hitSlop={10}
                onPress={() => {
                  if (keyboardText.length === 0) return;
                  sendUserChat(keyboardText);
                  setKeyboardText("");
                }}
              >
                <Send color={textColor} />
              </Pressable>
            </View>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default Recorder;
