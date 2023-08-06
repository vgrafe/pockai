import List from "@/components/List";
import { Text } from "@/components/Text";
import { View } from "react-native";
import { useAsyncStore } from "@/lib/asyncStore";
import { Link } from "expo-router";
import { styles } from "@/lib/styles";
import { useEffect } from "react";
import { defaultPersonality, getSystemPrompt } from "@/lib/defaultPersona";
import { Button } from "@/components/Button";
import { Onboarding } from "@/components/Onboarding";

const Contacts = () => {
  const [contacts, setContacts, showOnboarding, setShowOnboarding] =
    useAsyncStore((a) => [
      a.contacts,
      a.setContacts,
      a.showOnboarding,
      a.setShowOnboarding,
    ]);

  useEffect(() => {
    if (contacts.length === 0) {
      const newContact = {
        name: "Nick",
        personality: defaultPersonality,
        history: [
          {
            role: "system" as OpenAiRole,
            content: getSystemPrompt("Nick", defaultPersonality),
          },
        ],
      };

      setContacts([newContact]);
    }
  }, []);

  const showIntroText = contacts.length === 1 && contacts[0].name === "Nick";

  if (showOnboarding)
    return (
      <View style={{ gap: 12, margin: 12, flex: 1, marginBottom: 100 }}>
        <Onboarding />
        <Button title="close" onPress={() => setShowOnboarding(false)} />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      {contacts
        .filter((contact) => contact.name)
        .map((contact) => (
          <List.Item key={contact.name}>
            <Link href={`/contacts/${contact.name}/chat`}>
              <Text>{contact.name}</Text>
            </Link>
          </List.Item>
        ))}
      <View
        style={{
          marginTop: 32,
        }}
      >
        <Link asChild href="/contacts/new">
          <Button title="Add Contact" />
        </Link>
      </View>
      {showIntroText && (
        <View style={[styles.centeredContent, { flex: 1, margin: 36 }]}>
          <Text style={{ textAlign: "center" }}>
            You have no contacts, so we added {contacts[0].name} for you. Go
            ahead and click on it to start chatting!
          </Text>
        </View>
      )}
    </View>
  );
};

export default Contacts;
