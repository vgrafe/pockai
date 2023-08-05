import { Button } from "@/components/Button";
import List from "@/components/List";
import { Text } from "@/components/Text";
import { useAsyncStore } from "@/lib/asyncStore";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  const params = useLocalSearchParams();

  const router = useRouter();

  const [contacts, setContacts] = useAsyncStore((a) => [
    a.contacts,
    a.setContacts,
  ]);

  return (
    <View>
      <List.Item>
        <Link href={`/contacts/${params.name}/personality`}>
          <Text>personality</Text>
        </Link>
      </List.Item>
      <List.Item>
        <Link href={`/contacts/${params.name}/voice`}>
          <Text>voice</Text>
        </Link>
      </List.Item>
      <Button
        style={{ margin: 12 }}
        onPress={() => {
          setContacts(contacts.filter((c) => c.name !== params.name));
          router.push("/");
        }}
        title="delete"
      />
    </View>
  );
}
