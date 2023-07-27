import { ScrollView, View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useElevenLabsVoices } from "@/lib/queries";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const PersonaSettings = () => {
  const { persona } = useAsyncStore();
  const { data: voices, isLoading } = useElevenLabsVoices();
  const [selectedVoice, setSelectedVoice] = useState(voices ? voices[0] : null);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Picker
            selectedValue={selectedVoice}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue: string) => setSelectedVoice(itemValue)}
          >
            {voices?.voices.map((voice: { name: string }) => (
              <Picker.Item key={voice.name} label={voice.name} value={voice} />
            ))}
          </Picker>
        )}
        <Text style={styles.text}>
          The following is the system prompt for Pockai. It provides initial
          instructions to the underlying language model, helping it understand
          the context of your conversation.
        </Text>
        <Text style={styles.text}>{persona}</Text>
      </View>
    </ScrollView>
  );
};

export default PersonaSettings;
