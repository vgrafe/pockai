import { ScrollView, View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { styles } from "@/lib/styles";
import { Text } from "@/components/Text";

const PersonaSettings = () => {
  const { persona } = useAsyncStore();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>
          The following is the system prompt for Pockai. It provides initial
          instructions to the underlying language model, helping it understand
          the context of your conversation.
        </Text>
        <Text>{persona}</Text>
      </View>
    </ScrollView>
  );
};

export default PersonaSettings;
