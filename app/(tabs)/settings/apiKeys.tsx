import React from "react";
import { View, StyleSheet } from "react-native";
import { useApiTokens } from "@/lib/secureStore";
import { TextInput, Text } from "@/components/Themed";

const ApiKeys = () => {
  const { openAi, elevenLabs, setElevenLabs, setOpenAi } = useApiTokens();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Pockai needs two api keys to function. Those will be kept in your device
        secured storage and never uploaded.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>OpenAI (chat, required)</Text>
        <TextInput
          style={styles.input}
          value={openAi?.toString()}
          onChangeText={(t: string) => setOpenAi(t)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Elevenlabs (speech synthesis, optional)
        </Text>
        <TextInput
          style={styles.input}
          value={elevenLabs?.toString()}
          onChangeText={(t: string) => setElevenLabs(t)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 24,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default ApiKeys;
