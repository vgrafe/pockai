import { Text, YStack } from "tamagui";
import { useAsyncStore } from "../../lib/store";

const Settings = () => {
  const { persona, setPersona } = useAsyncStore();

  return (
    <YStack>
      <Text>{persona.personality}</Text>
      <Text>{persona.location}</Text>
      <Text>{persona.conversationStyle}</Text>
      <Text>{persona.resiliency}</Text>
    </YStack>
  );
};

export default Settings;
