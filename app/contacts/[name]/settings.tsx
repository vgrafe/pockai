import { Button } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { useAsyncStore } from "@/lib/asyncStore";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  const { currentContact, updateContact } = useCurrentContact();

  const router = useRouter();

  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  return (
    <View style={{ gap: 12, margin: 12 }}>
      <ContactForm
        contact={currentContact!}
        onSave={(updatedContact) => {
          updateContact(updatedContact);
          router.back();
        }}
      />
      <Button
        title="delete contact"
        lightColor="#f77"
        style={{ alignSelf: "center" }}
        onPress={() => {
          setContacts(contacts.filter((c) => c.name !== currentContact!.name));
          router.replace("/");
        }}
      />
    </View>
  );
}
