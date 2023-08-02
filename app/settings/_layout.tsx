import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "preferences",
};

export default function Settings() {
  return (
    <Stack initialRouteName="preferences">
      <Stack.Screen
        name="preferences"
        options={{ headerShown: false, title: "Settings" }}
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
