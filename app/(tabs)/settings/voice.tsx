import { View, Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { Button, ScrollView } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { TouchableOpacity } from "react-native-gesture-handler";

const Voice = () => {
  const { data: voices, isLoading } = useElevenLabsVoices();
  const [selectedVoice, setSelectedVoice] = useAsyncStore((a) => [
    a.voice,
    a.setVoice,
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <TouchableOpacity
              key={voice.name}
              onPress={() => setSelectedVoice(voice)}
            >
              <Text>
                {voice.name}{" "}
                {selectedVoice?.voice_id === voice.voice_id ? " SELECTED" : ""}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Voice;
