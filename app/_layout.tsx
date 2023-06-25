import { SplashScreen, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { YStack, XStack, Text, TamaguiProvider, Theme } from "tamagui";
import { Smile, Users, User, Settings2 } from "@tamagui/lucide-icons";

import config from "../tamagui.config";
import { useFonts } from "expo-font";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isReady && <SplashScreen />}
      {loaded && (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <TamaguiProvider config={config}>
              <Theme name={colorScheme === "dark" ? "dark" : "light"}>
                <YStack h="100%">
                  <XStack
                    p="$3"
                    pt="$8"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colorScheme === "dark" ? "#110" : "#aaa"}
                  >
                    <Text fontSize="$8">Pockai</Text>
                  </XStack>
                  <Tabs initialRouteName="index">
                    <Tabs.Screen
                      name="index"
                      options={{
                        title: "Chat",
                        tabBarIcon: () => <Smile />,
                        headerShown: false,
                      }}
                    />
                    <Tabs.Screen
                      name="persona"
                      options={{
                        title: "Persona",
                        tabBarIcon: () => <User />,
                        headerShown: false,
                      }}
                    />
                    <Tabs.Screen
                      name="settings"
                      options={{
                        title: "Settings",
                        tabBarIcon: () => <Settings2 />,
                        headerShown: false,
                      }}
                    />
                  </Tabs>
                </YStack>
              </Theme>
            </TamaguiProvider>
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </>
  );
}
