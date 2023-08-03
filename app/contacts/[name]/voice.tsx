import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { ScrollView, View } from "react-native";
import List from "@/components/List";
import { Text } from "@/components/Text";
import { useCurrentContact } from "@/lib/useCurrentContact";

const Voice = () => {
  const { data: voices, isLoading, isError } = useElevenLabsVoices();

  const { currentContact, updateContact } = useCurrentContact();

  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error - check your elevenlabs api key.</Text>
      ) : (
        <View style={styles.container}>
          {voices?.voices.map((voice: { name: string; voice_id: string }) => (
            <List.Item
              key={voice.name}
              onPress={() => {
                debugger;
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
