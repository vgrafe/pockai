import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView, View } from "react-native";
import List from "@/components/List";
import { Text } from "@/components/Text";
import { useCurrentContact } from "@/lib/useCurrentContact";
import { Link } from "expo-router";

const Voice = () => {
  const { data: voices, isLoading, isError } = useElevenLabsVoices();

  const { currentContact, updateContact } = useCurrentContact();

  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
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
          {voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <List.Item
              key={voice.name}
              onPress={() => {
                updateContact({ ...currentContact!, voiceId: voice.voice_id });
              }}
            >
              <Text>
                {voice.name}{" "}
                {currentContact!.voiceId === voice.voice_id ? " SELECTED" : ""}
              </Text>
            </List.Item>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Voice;
