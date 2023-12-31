import { styles } from "@/lib/styles";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/Text";
import { ExternalLink } from "@/components/ExternalLink";
import ApiKeysMenu from "@/components/ApiKeysMenu";

const Settings = () => {
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      style={[styles.container, { padding: 12 }]}
    >
      <View style={{ gap: 32 }}>
        <ApiKeysMenu />
        <Text>
          Thanks for giving a try to Pock.ai! I have bigger plans for this
          project. I want to make a multiplayer game out of it. Let's see where
          it goes, if it goes anywhere.
        </Text>
        <Text style={{ marginTop: 32 }}>
          Made with 🌀 by{" "}
          <ExternalLink style={{ fontWeight: "700" }} href="https://vgrafe.com">
            vgrafe
          </ExternalLink>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Settings;
