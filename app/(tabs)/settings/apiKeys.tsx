import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useApiTokens } from "@/lib/secureStore";
import { TextInput, Text } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";

const ApiKeys = () => {
  const { openAi, elevenLabs, setElevenLabs, setOpenAi } = useApiTokens();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Pockai needs two api keys to function. Those are saved in your{" "}
        {Platform.OS === "web"
          ? "browser's localStorage"
          : "device secured storage"}{" "}
        and never uploaded. They are only used in the respective api calls
        necessary for the experience to work.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          OpenAI (chat, required) -{" "}
          <ExternalLink href="https://platform.openai.com/account/api-keys">
            link
          </ExternalLink>
        </Text>
        <TextInput
          style={styles.input}
          value={openAi?.toString()}
          onChangeText={(t: string) => setOpenAi(t)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Elevenlabs (speech synthesis, optional) -{" "}
          <ExternalLink href="https://platform.openai.com/account/api-keys">
            link
          </ExternalLink>
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
