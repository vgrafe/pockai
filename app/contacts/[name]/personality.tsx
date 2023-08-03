import { ScrollView } from "react-native";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { TextInput } from "@/components/TextInput";

const SystemPrompt = () => {
  const { currentContact, updateContact } = useCurrentContact();

  return (
    <ScrollView style={{ height: 500, margin: 12 }}>
      <TextInput
        value={currentContact?.prompt}
        onChangeText={(text) => {
          updateContact({ ...currentContact!, prompt: text });
        }}
        multiline
        numberOfLines={25}
        style={{ padding: 8, borderRadius: 8, fontSize: 16 }}
      />
    </ScrollView>
  );
};

export default SystemPrompt;
