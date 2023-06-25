import { Link } from "expo-router";
import { Stack, Text, ListItem, Button, Spinner } from "tamagui";
import { useGetAsyncStorage, useSetAsyncStorage } from "../../lib/queries";

const Personae = () => {
  const { data: personalities, isLoading } = useGetAsyncStorage<Personality[]>(
    "personas",
    []
  );

  const setPersonalities = useSetAsyncStorage<Personality[]>("personas");

  if (isLoading) return <Spinner size="large" />;

  return (
    <Stack height="100%" justifyContent="space-between">
      {personalities.length === 0 && (
        <>
          <Text>You have no personality.</Text>
          <Button
            m={12}
            onPress={() => {
              setPersonalities.mutate([
                {
                  name: "new",
                },
              ]);
            }}
          >
            Fix this
          </Button>
        </>
      )}
      {personalities.map((personality) => (
        <Link
          href={`/persona/${personality.name}`}
          key={personality.name}
          asChild
        >
          <ListItem>{personality.name}</ListItem>
        </Link>
      ))}
      <Button
        m={12}
        onPress={() => {
          setPersonalities.mutate([
            ...personalities,
            {
              name: "new",
            },
          ]);
        }}
      >
        Add
      </Button>
    </Stack>
  );
};

export default Personae;
