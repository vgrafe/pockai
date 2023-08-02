import List from "@/components/List";
import { Text } from "@/components/Text";
import { View } from "react-native";
import { useAsyncStore } from "@/lib/asyncStore";
import { Link } from "expo-router";
import { styles } from "@/lib/styles";
import { useEffect } from "react";
import { systemPrompt } from "@/lib/defaultPersona";

const Contacts = () => {
  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  useEffect(() => {
    if (contacts.length === 0) {
      const newContact = {
        id: "jean",
        name: "Jean",
        prompt: systemPrompt,
        voiceId: "TxGEqnHWrfWFTfGW9XjX",
      };

      setContacts([newContact]);
    }
  }, []);

  if (contacts.length === 0) {
    return (
      <View style={styles.centeredContent}>
        <Text>no contacts</Text>
      </View>
    );
  }

  return (
    <View>
      {contacts.map((contact) => (
        <List.Item key={contact.id}>
          <Link href={`/contacts/${contact.id}`}>
            <Text>{contact.name}</Text>
          </Link>
        </List.Item>
      ))}
    </View>
  );
};

export default Contacts;
