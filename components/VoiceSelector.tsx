import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView, View } from "react-native";
import List from "@/components/List";
import { Text } from "@/components/Text";
import { Link } from "expo-router";

type VoiceSelectorProps = {
  selectedVoiceId?: string;
  onSelect: (voice: Voice) => void;
};

export const VoiceSelector = (props: VoiceSelectorProps) => {
  const { data: voices, isLoading, isError } = useElevenLabsVoices();

  return (
    <ScrollView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999999,
      }}
    >
      {isLoading ? (
        <View style={styles.centeredContent}>
          <Text>Loading...</Text>
        </View>
      ) : isError ? (
        <View style={styles.centeredContent}>
          <Text>
            Your elevenlabs api key is not valid, double check it in the main
            settings.
          </Text>
          <Link href="/settings">
            <Text style={{ marginBottom: 16 }}>go to settings</Text>
          </Link>
        </View>
      ) : (
        <View>
          {voices?.voices.map((voice: Voice) => (
            <List.Item
              key={voice.name}
              onPress={() => {
                props.onSelect(voice);
              }}
            >
              <Text>
                {voice.name}{" "}
                {props.selectedVoiceId === voice.voice_id ? " (selected)" : ""}
              </Text>
            </List.Item>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
