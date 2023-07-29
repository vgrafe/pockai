import { Link } from "expo-router";
import { Text } from "@/components/Themed";
import { styles } from "@/lib/styles";
import { useApiTokens } from "@/lib/secureStore";
import { View } from "@/components/View";

const Settings = () => {
  const { elevenLabs } = useApiTokens();

  return (
    <View
      style={[
        styles.container,
        {
          gap: 32,
        },
      ]}
    >
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
