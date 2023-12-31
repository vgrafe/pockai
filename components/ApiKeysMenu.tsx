import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSecureStore } from "@/lib/secureStore";
import { TextInput } from "@/components/TextInput";
import { ExternalLink } from "@/components/ExternalLink";
import { styles } from "@/lib/styles";
import { Text } from "@/components/Text";

const ApiKeysMenu = () => {
  const { openAi, elevenLabs, setElevenLabs, setOpenAi } = useSecureStore();

  return (
    <View
      style={[
        styles.container,
        {
          gap: 32,
        },
      ]}
    >
      <Text>
        You must provide at least one api key for Pock.ai to function. Those are
        not sent to any server, all the data (including chat history) is stored
        in the{" "}
        {Platform.OS === "web"
          ? "browser's session storage"
          : "device secured storage"}{" "}
        and never uploaded. They are only used in the respective api calls
        necessary for the experience to work.
      </Text>
      <View style={localStyles.inputContainer}>
        <Text style={localStyles.label}>
          OpenAI (chat, required) -{" "}
          <ExternalLink href="https://platform.openai.com/account/api-keys">
            link
          </ExternalLink>
        </Text>
        <TextInput
          style={localStyles.input}
          value={openAi?.toString()}
          onChangeText={(t: string) => setOpenAi(t)}
        />
      </View>
      <View style={localStyles.inputContainer}>
        <Text style={localStyles.label}>
          Elevenlabs (speech synthesis, optional) -{" "}
          <ExternalLink href="https://elevenlabs.io/">link</ExternalLink>
        </Text>
        <TextInput
          style={localStyles.input}
          value={elevenLabs?.toString()}
          onChangeText={(t: string) => setElevenLabs(t)}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    alignSelf: "stretch",
  },
});

export default ApiKeysMenu;
