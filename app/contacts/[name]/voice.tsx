import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView, View } from "react-native";
import { useAsyncStore } from "@/lib/asyncStore";
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
        <View style={styles.container}>
          {voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <List.Item key={voice.name} onPress={() => setSelectedVoice(voice)}>
              <Text>
                {voice.name}{" "}
                {selectedVoice?.voice_id === voice.voice_id ? " SELECTED" : ""}
              </Text>
            </List.Item>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Voice;
