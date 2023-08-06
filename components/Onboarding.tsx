import { SafeAreaView } from "react-native";
import { Text } from "./Text";

export const Onboarding = () => (
  <SafeAreaView
    style={{
      flex: 1,
      gap: 12,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 500,
      marginHorizontal: "auto",
    }}
  >
    <Text style={{ fontSize: 22, fontWeight: "400" }}>Welcome to Pock.ai!</Text>
    <Text
      style={{
        textAlign: "center",
      }}
    >
      Pock.ai combines the prowess of OpenAI's ChatGPT and ElevenLabs' Whisper
      system to create a unique mobile experience: a customizable contact list
      where each contact is powered by AI with a personality of your choosing!
      Want to chat with a fictional character, an emulation of a historical
      figure, or perhaps a custom persona you've dreamt up? PersonaChat lets you
      craft conversations with them, giving a voice to your imagination.
    </Text>
    <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "400" }}>
      Where to start
    </Text>
    <Text
      style={{
        textAlign: "center",
      }}
    >
      First you'll need to get an api key from OpenAI, and optionally a key from
      ElevelLabs. Set them in the settings menu. Then you can chat with the
      default contact/personality, or create your own contacts, define their
      personality then chat with them!
    </Text>
  </SafeAreaView>
);
