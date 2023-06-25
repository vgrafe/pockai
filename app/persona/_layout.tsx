import { Stack, Slot } from "expo-router";
import { Text } from "tamagui";

export default function Layout() {
  return (
    <Slot initialRouteName="settings" />
    // to use when we allow multiple persona
    // <Stack initialRouteName="personalities">
    //   <Stack.Screen
    //     name="[name]"
    //     // @ts-ignore
    //     options={({ route }) => ({
    //       headerTitle: () => <Text>{route.params.name}</Text>,
    //     })}
    //   />
    // </Stack>
  );
}
