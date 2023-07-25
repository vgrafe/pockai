import { Link } from "expo-router";
import { View, Text } from "@/components/Themed";

const Settings = () => (
  <View>
    <Link href="/settings/apiKeys">
      <Text style={{ fontSize: 32 }}>API keys</Text>
    </Link>
    <Link href="/settings/about">
      <Text style={{ fontSize: 32 }}>About</Text>
    </Link>
  </View>
);

export default Settings;
