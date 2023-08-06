import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useAsyncStore = create(
  persist(
    combine(
      {
        showOnboarding: true as boolean,
        contacts: [] as Contact[],
      },
      (set) => ({
        setContacts: (contacts: Contact[]) => set({ contacts }),
        setShowOnboarding: (showOnboarding: boolean) => set({ showOnboarding }),
      })
    ),
    {
      name: "pockai-10",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
