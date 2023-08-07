import { Button } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { useAsyncStore } from "@/lib/asyncStore";
import { getSystemPrompt } from "@/lib/defaultPersona";
import { styles } from "@/lib/styles";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Settings() {
  const { currentContact, updateContact } = useCurrentContact();

  const router = useRouter();

  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  const resetChat = (contact: Contact) => {
    contact.history = [
      {
        role: "system",
        content: getSystemPrompt(contact.name, contact.personality),
      },
    ];
  };

  return (
    <ScrollView style={styles.container}>
      <ContactForm
        contact={currentContact!}
        onSave={(updatedContact, reset) => {
          if (reset) resetChat(updatedContact);
          updateContact(updatedContact);
          router.back();
        }}
      >
        <Button
          title="delete contact"
          variant="danger"
          onPress={() => {
            setContacts(
              contacts.filter((c) => c.name !== currentContact!.name)
            );
            router.replace("/");
          }}
        />
        <Button
          title="reset chat"
          variant="danger"
          onPress={() => {
            resetChat(currentContact!);
            updateContact(currentContact!);
          }}
        />
      </ContactForm>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
