import { useLocalSearchParams } from "expo-router";
import { ListItem, Spinner, Stack, Text } from "tamagui";
import { useElevenLabsVoices } from "../../lib/queries";
import { Input } from "tamagui";

const Persona = () => {
  const { name } = useLocalSearchParams();

  const { data: voices, isLoading } = useElevenLabsVoices();

  if (isLoading) return <Spinner size="large" />;

  return (
    <Stack>
      <Text>{name}</Text>
      <Input value={name} onChange={(e) => console.log(e.target.value)} />
      {voices.voices.map((voice) => (
        <ListItem key={voice.name}>{voice.name}</ListItem>
      ))}
      <Text>{JSON.stringify(voices, null, 2)}</Text>
    </Stack>
  );
};

export default Persona;
