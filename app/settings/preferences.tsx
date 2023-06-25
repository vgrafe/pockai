import { Stack, ListItem } from "tamagui";
import { Link } from "expo-router";

const Settings = () => (
  <Stack>
    <Link href="/settings/apiKeys" asChild>
      <ListItem>API keys</ListItem>
    </Link>
    <Link href="/settings/about" asChild>
      <ListItem>About</ListItem>
    </Link>
  </Stack>
);

export default Settings;
