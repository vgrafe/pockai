import { View, Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView } from "react-native";
import { useAsyncStore } from "@/lib/store";

const Voice = () => {
  const { data: voices, isLoading } = useElevenLabsVoices();
  const [voiceId, setVoiceId] = useAsyncStore((a) => [a.voiceId, a.setVoiceId]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <Text key={voice.name} onPress={() => setVoiceId(voice.voice_id)}>
              {voice.name}
              {voiceId === voice.voice_id && " ASAASDAOISJDOAISJD"}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Voice;
