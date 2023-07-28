import { Link } from "expo-router";
import { View, Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useApiTokens } from "@/lib/secureStore";

const Settings = () => {
  const { elevenLabs } = useApiTokens();

  return (
    <View style={styles.container}>
      <Link href="/settings/apiKeys">
        <Text style={{ fontSize: 32 }}>API keys</Text>
      </Link>
      <Link href="/settings/about">
        <Text style={{ fontSize: 32 }}>About</Text>
      </Link>
      {elevenLabs && (
        <Link href="/settings/voice">
          <Text style={{ fontSize: 32 }}>Voice</Text>
        </Link>
      )}
    </View>
  );
};

export default Settings;
