import { ExternalLink } from "@/components/ExternalLink";
import { View, Text } from "@/components/Themed";
import { styles } from "@/lib/styles";

const About = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Thanks for giving a try to Pockai! I have bigger plans for this project. I
      want to make a multiplayer game out of it. Let's see where it goes, if it
      goes anywhere.
    </Text>
    <Text style={styles.text}>
      Made with 🌀 by{" "}
      <ExternalLink style={{ fontWeight: "700" }} href="https://vgrafe.com">
        vgrafe
      </ExternalLink>
    </Text>
  </View>
);

export default About;
