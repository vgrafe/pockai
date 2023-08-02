import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView } from "react-native";
import { useAsyncStore } from "@/lib/store";
import List from "@/components/List";
import { Text } from "@/components/Text";

const Voice = () => {
  const { data: voices, isLoading, isError } = useElevenLabsVoices();
  const [selectedVoice, setSelectedVoice] = useAsyncStore((a) => [
    a.voice,
    a.setVoice,
  ]);

  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error - check your elevenlabs api key.</Text>
      ) : (
        <List.Container style={styles.container}>
          {voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <List.Item key={voice.name} onPress={() => setSelectedVoice(voice)}>
              <Text>
                {voice.name}{" "}
                {selectedVoice?.voice_id === voice.voice_id ? " SELECTED" : ""}
              </Text>
            </List.Item>
          ))}
        </List.Container>
      )}
    </ScrollView>
  );
};

export default Voice;
