import { Stack } from "expo-router";
import { Text } from "tamagui";

export default function Settings() {
  return (
    <Stack initialRouteName="preferences">
      <Stack.Screen
        name="apiKeys"
        options={{
          title: "API Keys",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
    </Stack>
  );
}
