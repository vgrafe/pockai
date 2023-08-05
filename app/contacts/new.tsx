import ContactForm from "@/components/ContactForm";
import { useAsyncStore } from "@/lib/asyncStore";
import { useRouter } from "expo-router";

export default function NewContact() {
  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  const router = useRouter();

  return (
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
  );
}
