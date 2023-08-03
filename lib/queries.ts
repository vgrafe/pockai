import { useQuery } from "@tanstack/react-query";
import { useSecureStore } from "./secureStore";

export const keys = {
  elevenLabsVoices: ["elevenlabs-voices"],
};

export const useElevenLabsVoices = () => {
  const { elevenLabs } = useSecureStore();

  return useQuery([keys.elevenLabsVoices, elevenLabs], async () => {
    const req = await fetch("https://api.elevenlabs.io/v1/voices", {
      method: "GET",
      headers: {
        "xi-api-key": elevenLabs,
        "Content-Type": "application/json",
      },
    });

    if (req.ok) return await req.json();

    throw new Error("Error while fetching voices");
  });
};
