/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  TextInput as DefaultTextInput,
} from "react-native";

import Colors from "@/constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type InputProps = ThemeProps & DefaultTextInput["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ color }, { fontWeight: "300" }, style]}
      {...otherProps}
    />
  );
}

export function TextInput(props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultTextInput style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Bubble(
  props: ViewProps & {
    backgroundColor: "blue" | "gray";
    alignSelf: "flex-end" | "flex-start";
  }
) {
  const {
    style,
    lightColor,
    darkColor,
    alignSelf,
    backgroundColor,
    ...otherProps
  } = props;

  const theme = useColorScheme() ?? "light";

  const colors = {
    light: { blue: "#99f", gray: "#bbb" },
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
    />
  );
}
