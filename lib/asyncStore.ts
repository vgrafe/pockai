import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { systemPrompt } from "./defaultPersona";

export const useAsyncStore = create(
  persist(
    combine(
      {
        contacts: [] as Contact[],
        persona: systemPrompt,
        voice: { name: "n/a", voice_id: "TxGEqnHWrfWFTfGW9XjX" },
      },
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
