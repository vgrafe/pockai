import { Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { List, ListItem } from "@/components/List";

const Voice = () => {
  const { data: voices, isLoading } = useElevenLabsVoices();
  const [selectedVoice, setSelectedVoice] = useAsyncStore((a) => [
    a.voice,
    a.setVoice,
  ]);

  return (
    <ScrollView>
      <List style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <ListItem key={voice.name}>
              <TouchableOpacity onPress={() => setSelectedVoice(voice)}>
                <Text>
                  {voice.name}{" "}
                  {selectedVoice?.voice_id === voice.voice_id
                    ? " SELECTED"
                    : ""}
                </Text>
              </TouchableOpacity>
            </ListItem>
          ))
        )}
      </List>
    </ScrollView>
  );
};

export default Voice;
