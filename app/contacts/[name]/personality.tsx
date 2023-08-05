import { ScrollView, View } from "react-native";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { TextInput } from "@/components/TextInput";
import { Text } from "@/components/Text";
import { styles } from "@/lib/styles";

const SystemPrompt = () => {
  const { currentContact, updateContact } = useCurrentContact();

  return (
    <View style={styles.container}>
      <Text style={{ margin: 4, marginBottom: 12 }}>
        The following is what will be used for OpenAI's ChatGPT "system prompt".
        This is an initial prompt that is useful to describe personality you
        want to talk to. It is enhanced by the app to make the responses more
        human and less verbose.
      </Text>
      <ScrollView>
        <TextInput
          value={currentContact?.personality}
          onChangeText={(personality) => {
            updateContact({ ...currentContact!, personality });
          }}
          multiline
          numberOfLines={25}
          style={{ padding: 8, borderRadius: 8, fontSize: 16 }}
        />
      </ScrollView>
    </View>
  );
};

export default SystemPrompt;
