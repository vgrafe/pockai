import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { useAsyncStore } from "@/lib/asyncStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function NewContact() {
  const [newContact, setNewContact] = useState({
    name: "",
    prompt: "",
    voiceId: "",
  });

  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  const router = useRouter();

  return (
    <View>
      <Text>name</Text>
      <TextInput
        value={newContact.name}
        onChangeText={(name) => setNewContact((c) => ({ ...c, name }))}
      />
      <Text>prompt</Text>
      <TextInput
        value={newContact.prompt}
        onChangeText={(prompt) => setNewContact((c) => ({ ...c, prompt }))}
      />
      <Button
        title="Save"
        onPress={() => {
          setContacts([...contacts, newContact]);
          router.back();
        }}
      />
    </View>
  );
}
