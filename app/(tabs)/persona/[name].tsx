import { useLocalSearchParams } from "expo-router";
import { TextInput, StyleSheet, View, ActivityIndicator } from "react-native";
import { useElevenLabsVoices } from "@/lib/queries";
import { Text } from "@/components/Themed";

const Persona = () => {
  const { name } = useLocalSearchParams();
  const { data: voices, isLoading } = useElevenLabsVoices();

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        style={styles.input}
        value={name.toString()}
        onChangeText={(text) => console.log(text)}
      />
      {voices.voices.map((voice: { name: string }) => (
        <View key={voice.name} style={styles.listItem}>
          <Text>{voice.name}</Text>
        </View>
      ))}
      <Text style={styles.text}>{JSON.stringify(voices, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 96,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default Persona;
