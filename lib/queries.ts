import { useQuery } from "@tanstack/react-query";
import { useApiTokens } from "./secureStore";

export const keys = {
  elevenLabsVoices: ["elevenlabs-voices"],
};

export const useElevenLabsVoices = () => {
  const { elevenLabs } = useApiTokens();

  return useQuery([keys.elevenLabsVoices, elevenLabs], async () => {
    const req = await fetch("https://api.elevenlabs.io/v1/voices", {
      method: "GET",
      headers: {
        "xi-api-key": elevenLabs,
        "Content-Type": "application/json",
      },
    });

    return await req.json();
  });
};
