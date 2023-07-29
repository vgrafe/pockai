import { ExternalLink } from "@/components/ExternalLink";
import { View } from "@/components/View";
import { styles } from "@/lib/styles";
import { Text } from "@/components/Text";

const About = () => (
  <View
    style={[
      styles.container,
      {
        gap: 32,
      },
    ]}
  >
    <Text>
      Thanks for giving a try to Pockai! I have bigger plans for this project. I
      want to make a multiplayer game out of it. Let's see where it goes, if it
      goes anywhere.
    </Text>
    <Text>
      Made with 🌀 by{" "}
      <ExternalLink style={{ fontWeight: "700" }} href="https://vgrafe.com">
        vgrafe
      </ExternalLink>
    </Text>
  </View>
);

export default About;
