import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { systemPrompt } from "./defaultPersona";

export const useAsyncStore = create(
  persist(
    combine({ persona: systemPrompt }, (set) => ({
      setPersona: (persona: null | string) => set({ persona }),
    })),
    {
      name: "persona",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
