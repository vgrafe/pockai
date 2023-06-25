import { ScrollView, Text, YStack } from "tamagui";
import { useAsyncStore } from "../../lib/store";

const Settings = () => {
  const { persona } = useAsyncStore();

  return (
    <ScrollView h="100%">
      <YStack p={12}>
        <Text fontSize={18}>
          The following is the system prompt for Pockai. It provides initial
          instructions to the underlying language model, helping it understand
          the context of your conversation.
        </Text>
        <Text fontSize={16} opacity={0.75}>
          {persona}
        </Text>
      </YStack>
    </ScrollView>
  );
};

export default Settings;
