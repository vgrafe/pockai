import { Stack } from "expo-router";

export default function Settings() {
  return (
    <Stack initialRouteName="preferences">
      <Stack.Screen
        name="preferences"
        options={{
          title: "Settings",
        }}
      />
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
