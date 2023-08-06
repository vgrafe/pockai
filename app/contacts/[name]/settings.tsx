import { Button } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { useAsyncStore } from "@/lib/asyncStore";
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

  return (
    <ScrollView style={styles.container}>
      <ContactForm
        contact={currentContact!}
        onSave={(updatedContact) => {
          updateContact(updatedContact);
          router.back();
        }}
      >
        <Button
          title="delete contact"
          lightColor="#f77"
          darkColor="#a44"
          onPress={() => {
            setContacts(
              contacts.filter((c) => c.name !== currentContact!.name)
            );
            router.replace("/");
          }}
        />
      </ContactForm>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
