import * as Speech from "expo-speech";
import { useAsyncStore } from "./store";

export const getElevenLabsVoices = async (elevenLabsKey: string) =>
  fetch("https://api.elevenlabs.io/v1/voices", {
    method: "GET",
    headers: {
      "xi-api-key": elevenLabsKey,
      "Content-Type": "application/json",
    },
  });

export const callElevenLabsWithText = async (
  text: string,
  elevenLabsKey: string
) => {
  const voiceId = useAsyncStore.getState().voice?.voice_id;

  if (!voiceId) {
    throw new Error("No voice selected");
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "xi-api-key": elevenLabsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      }),
    }
  );

  if (res.ok) return res.blob();

  throw new Error("Error while calling ElevenLabs API");
};

export const sayWithSystemSpeech = (text: string) => {
  return new Promise((resolve) => {
    Speech.speak(text, {
      onDone: () => resolve(true),
    });
  });
};
