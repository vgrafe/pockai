import ContactForm from "@/components/ContactForm";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  const { currentContact, updateContact } = useCurrentContact();

  const router = useRouter();

  return (
    <View style={{ gap: 12, margin: 12 }}>
      <ContactForm
        contact={currentContact!}
        onSave={(updatedContact) => {
          updateContact(updatedContact);
          router.back();
        }}
      />
    </View>
  );
}
