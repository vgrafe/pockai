import { ScrollView, Text, YStack } from "tamagui";
import { useAsyncStore } from "../../lib/store";

const PersonaSettings = () => {
  const { persona } = useAsyncStore();

  return (
    <ScrollView>
      <YStack p="$4">
        <Text fontSize="$7">
          The following is the system prompt for Pockai. It provides initial
          instructions to the underlying language model, helping it understand
          the context of your conversation.
        </Text>
        <Text fontSize="$1" opacity={0.75}>
          {persona}
        </Text>
      </YStack>
    </ScrollView>
  );
};

export default PersonaSettings;
