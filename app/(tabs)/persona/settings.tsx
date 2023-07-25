import { ScrollView, View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { MonoText } from "@/components/StyledText";

const PersonaSettings = () => {
  const { persona } = useAsyncStore();

  return (
    <ScrollView>
      <View
        style={{
          padding: 24,
        }}
      >
        <MonoText>
          The following is the system prompt for Pockai. It provides initial
          instructions to the underlying language model, helping it understand
          the context of your conversation.
        </MonoText>
        <MonoText>{persona}</MonoText>
      </View>
    </ScrollView>
  );
};

export default PersonaSettings;
