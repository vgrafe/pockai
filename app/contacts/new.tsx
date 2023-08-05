import ContactForm from "@/components/ContactForm";
import { useAsyncStore } from "@/lib/asyncStore";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function NewContact() {
  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  const router = useRouter();

  return (
    <View style={{ gap: 12, margin: 12 }}>
      <ContactForm
        contact={{
          name: "",
          personality: "",
        }}
        onSave={(savedContact) => {
          setContacts([...contacts, savedContact]);
          router.back();
        }}
      />
    </View>
  );
}
