import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, Switch, View, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Settings,
  Info,
  Mic2,
  Keyboard,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import { useAsyncStore } from "@/lib/asyncStore";
import { useThemeColor } from "@/lib/theme";

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

  const [showOnboarding, speakBack, setSpeakBack] = useAsyncStore((a) => [
    a.showOnboarding,
    a.speakBack,
    a.setSpeakBack,
  ]);

  const [iconColor] = useThemeColor([
    {
      colorName: "text",
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "Contacts",
              headerShown: !showOnboarding,
              headerRight: () => (
                <Link href="/settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Settings
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{
                          marginRight: 15,
                          opacity: pressed ? 0.5 : 1,
                        }}
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
              headerRight: () => (
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Pressable onPress={() => setSpeakBack(!speakBack)}>
                    {speakBack ? (
                      <Volume2 color={iconColor} />
                    ) : (
                      <VolumeX color={iconColor} />
                    )}
                  </Pressable>
                  <Link
                    href={`/contacts/${route.params.name}/settings`}
                    asChild
                  >
                    <Pressable>
                      {({ pressed }) => (
                        <Info
                          size={25}
                          color={Colors[colorScheme ?? "light"].text}
                          style={{
                            marginRight: 15,
                            opacity: pressed ? 0.5 : 1,
                          }}
                        />
                      )}
                    </Pressable>
                  </Link>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="contacts/[name]/settings"
            // @ts-expect-error
            options={({ route }) => ({
              title: `${route.params.name} - settings`,
            })}
          />
          <Stack.Screen name="settings" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="contacts/new"
            options={{
              title: "Add a new contact",
              presentation: "modal",
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
