import List from "@/components/List";
import { Text } from "@/components/Text";
import { View } from "react-native";
import { useAsyncStore } from "@/lib/store";
import { Link } from "expo-router";

const Contacts = () => {
  const contacts = useAsyncStore((a) => a.contacts);

  return (
    <View style={{ gap: 12, margin: 12 }}>
      {contacts.length ? (
        <List.Container>
          {contacts.map((contact) => (
            <List.Item key={contact.id}>
              <Link href={`/contacts/${contact.id}`}>
                <Text>{contact.name}</Text>
              </Link>
            </List.Item>
          ))}
        </List.Container>
      ) : (
        <Text>no contacts</Text>
      )}
      <List.Container>
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
      </List.Container>
    </View>
  );
};

export default Contacts;
