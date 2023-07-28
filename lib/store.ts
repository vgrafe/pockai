import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { systemPrompt } from "./defaultPersona";

export const useAsyncStore = create(
  persist(
    combine(
      { persona: systemPrompt, voice: { name: "n/a", voice_id: "" } },
      (set) => ({
        setPersona: (persona: null | string) => set({ persona }),
        setVoice: (voice: { name: string; voice_id: string }) =>
          set({ voice: voice }),
      })
    ),
    {
      name: "persona",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
