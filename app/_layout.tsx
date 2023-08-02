import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "lucide-react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "Contacts",
              headerShown: true,
              headerRight: () => (
                <Link href="/settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Settings
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="contacts/[name]/chat"
            // @ts-expect-error
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen name="settings" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
