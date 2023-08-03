import List from "@/components/List";
import { Text } from "@/components/Text";
import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  const params = useLocalSearchParams();

  return (
    <View>
      <List.Item>
        <Link href={`/contacts/${params.name}/voice`}>
          <Text>voice</Text>
        </Link>
      </List.Item>
      <List.Item>
        <Link href={`/contacts/${params.name}/personality`}>
          <Text>personality</Text>
        </Link>
      </List.Item>
    </View>
  );
}
