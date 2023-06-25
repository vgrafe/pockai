import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { defaultPersona } from "./defaultPersona";

export const useAsyncStore = create(
  persist(
    combine({ persona: defaultPersona }, (set) => ({
      setPersona: (persona: null | string) => set({ persona }),
    })),
    {
      name: "food-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
