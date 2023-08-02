import { useLocalSearchParams } from "expo-router";
import { useAsyncStore } from "./asyncStore";

export const useCurrentContact = () => {
  const params = useLocalSearchParams();

  const store = useAsyncStore();

  const currentContact = store.contacts.find((c) => c.name === params.name);

  const updateContact = (update: Contact) => {
    store.contacts = store.contacts.map((c) =>
      c.name === params.name ? update : c
    );
  };

  return { currentContact, updateContact };
};
