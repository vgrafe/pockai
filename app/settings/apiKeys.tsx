import { Stack, Text, Label, Input } from "tamagui";
import { useApiTokens } from "../../lib/secureStore";

const ApiKeys = () => {
  const { openAi, elevenLabs, setElevenLabs, setOpenAi } = useApiTokens();

  return (
    <Stack p={24} gap={24}>
      <Text>
        Pockai needs two api keys to function. Those will be kept in your device
        secured storage and never uploaded.
      </Text>
      <Stack>
        <Label htmlFor="openAi">OpenAI (chat, required)</Label>
        <Input id="openAi" value={openAi} onChangeText={(t) => setOpenAi(t)} />
      </Stack>
      <Stack>
        <Label htmlFor="Elevenlabs">
          Elevenlabs (speech synthesis, optional)
        </Label>
        <Input
          id="Elevenlabs"
          value={elevenLabs}
          onChangeText={(t) => setElevenLabs(t)}
        />
      </Stack>
    </Stack>
  );
};

export default ApiKeys;
