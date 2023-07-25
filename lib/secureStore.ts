import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useApiTokens = create(
  persist(
    combine(
      { openAi: null as null | string, elevenLabs: null as null | string },
      (set) => ({
        setOpenAi: (openAi: null | string) => set({ openAi }),
        setElevenLabs: (elevenLabs: null | string) => set({ elevenLabs }),
      })
    ),
    {
      name: "apiTokens",
      storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
