import { Link } from "expo-router";
import { View } from "react-native";
import { MonoText } from "@/components/StyledText";

const Settings = () => (
  <View>
    <Link href="/settings/apiKeys" asChild>
      <MonoText style={{ fontSize: 32 }}>API keys</MonoText>
    </Link>
    <Link href="/settings/about" asChild>
      <MonoText style={{ fontSize: 32 }}>About</MonoText>
    </Link>
  </View>
);

export default Settings;
