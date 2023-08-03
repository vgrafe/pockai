import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

import { Platform } from "react-native";

export const useSecureStore = create(
  persist(
    combine({ openAi: "", elevenLabs: "" }, (set) => ({
      setOpenAi: (openAi: string) => set({ openAi }),
      setElevenLabs: (elevenLabs: string) => set({ elevenLabs }),
    })),
    {
      name: "apiTokens",
      storage: createJSONStorage(() =>
        Platform.OS === "web"
          ? localStorage
          : {
              setItem: setItemAsync,
              getItem: getItemAsync,
              removeItem: deleteItemAsync,
            }
      ),
    }
  )
);
