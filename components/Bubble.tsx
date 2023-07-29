/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme, View as DefaultView } from "react-native";

import { ViewProps } from "./View";
import { Text } from "./Text";

export function Bubble(
  props: ViewProps & {
    backgroundColor: "blue" | "gray";
    alignSelf: "flex-end" | "flex-start";
    children: string;
    onPress?: () => void;
  }
) {
  const {
    style,
    lightColor,
    darkColor,
    alignSelf,
    backgroundColor,
    children,
    onPress,
    ...otherProps
  } = props;

  const theme = useColorScheme() ?? "light";

  const colors = {
    light: { blue: "#99f", gray: "#ddd" },
    dark: { blue: "#0A84FF", gray: "#333" },
  };

  return (
    <DefaultView
      style={[
        {
          alignSelf,
          paddingVertical: 4,
          paddingHorizontal: 6,
          borderRadius: 6,
          maxWidth: "95%",
          marginVertical: 4,
          backgroundColor: colors[theme][backgroundColor],
        },
        style,
      ]}
      {...otherProps}
    >
      <Text
        style={{
          fontSize: 18,
        }}
        onPress={onPress}
      >
        {children}
      </Text>
    </DefaultView>
  );
}
