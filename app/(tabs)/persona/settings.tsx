import { StyleSheet, ScrollView, View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { Text } from "@/components/Themed";

const PersonaSettings = () => {
  const { persona } = useAsyncStore();

  return (
    <ScrollView>
      <View
        style={{
          margin: 24,
          marginTop: 96,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

const styles = StyleSheet.create({
  text: { fontSize: 18, lineHeight: 26 },
});

export default PersonaSettings;
