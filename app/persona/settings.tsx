import { Text, YStack } from "tamagui";
import { useAsyncStore } from "../../lib/store";

const Settings = () => {
  const { persona } = useAsyncStore();

  return <Text>{persona}</Text>;
};

export default Settings;
