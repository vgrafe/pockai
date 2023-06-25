import * as Speech from "expo-speech";

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
  elevenLabsKey: string,
  voiceId: string = "TxGEqnHWrfWFTfGW9XjX"
) => {
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

  return res.blob();
};

export const sayWithSystemSpeech = (text: string) => {
  Speech.speak(text);
};
