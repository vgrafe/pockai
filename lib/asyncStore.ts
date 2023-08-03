import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useAsyncStore = create(
  persist(
    combine(
      {
        contacts: [] as Contact[],
      },
      (set) => ({
        setContacts: (contacts: Contact[]) => set({ contacts }),
      })
    ),
    {
      name: "persona",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
