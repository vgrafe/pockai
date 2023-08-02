import List from "@/components/List";
import { Text } from "@/components/Text";
import { View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { Link } from "expo-router";
import { styles } from "@/lib/styles";

const Contacts = () => {
  const contacts = useAsyncStore((a) => a.contacts);

  if (contacts.length === 0) {
    return (
      <>
        <View style={styles.centeredContent}>
          <Text>no contacts</Text>
        </View>
        <View style={{ position: "fixed", bottom: 80 }}>
          <Text>debug</Text>

          <List.Item>
            <Link href="/contacts/jean/chat">
              <Text>Jean</Text>
            </Link>
          </List.Item>
          <List.Item>
            <Link href="/contacts/cule/chat">
              <Text>Cule</Text>
            </Link>
          </List.Item>
        </View>
      </>
    );
  }

  return (
    <View>
      {contacts.map((contact) => (
        <List.Item key={contact.id}>
          <Link href={`/contacts/${contact.id}`}>
            <Text>{contact.name}</Text>
          </Link>
        </List.Item>
      ))}
    </View>
  );
};

export default Contacts;
