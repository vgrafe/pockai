import List from "@/components/List";
import { Text } from "@/components/Text";
import { View } from "react-native";
import { useAsyncStore } from "@/lib/asyncStore";
import { Link } from "expo-router";
import { styles } from "@/lib/styles";
import { useEffect } from "react";
import { defaultPersonality } from "@/lib/defaultPersona";
import { Button } from "@/components/Button";

const Contacts = () => {
  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  useEffect(() => {
    if (contacts.length === 0) {
      const newContact = {
        name: "jean",
        personality: defaultPersonality,
      };

      setContacts([newContact]);
    }
  }, []);

  const showIntroText = contacts.length === 1 && contacts[0].name === "jean";

  return (
    <View>
      {contacts.map((contact) => (
        <List.Item key={contact.name}>
          <Link href={`/contacts/${contact.name}/chat`}>
            <Text>{contact.name}</Text>
          </Link>
        </List.Item>
      ))}
      {showIntroText && (
        <View style={styles.centeredContent}>
          <Text>
            You have no contacts, so we added {contacts[0].name} for you. Go
            ahead and click on it to start chatting!
          </Text>
        </View>
      )}
      <View
        style={{
          alignSelf: "center",
          marginTop: 32,
        }}
      >
        <Link asChild href="/contacts/new">
          <Button title="Add Contact" />
        </Link>
      </View>
    </View>
  );
};

export default Contacts;
