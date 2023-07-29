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
import { ViewProps } from "./View";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type InputProps = ThemeProps & DefaultTextInput["props"];

type ThemeColorParams = {
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark;
  overrides: { light?: string; dark?: string };
};

export function useThemeColor(params: ThemeColorParams[]) {
  const theme = useColorScheme() ?? "light";

  let result = [];

  for (const param of params) {
    const colorFromProps = param.overrides[theme];

    if (colorFromProps) {
      result.push(colorFromProps);
    } else {
      result.push(Colors[theme][param.colorName]);
    }
  }

  return result;
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const [color] = useThemeColor([
    { colorName: "text", overrides: { light: lightColor, dark: darkColor } },
  ]);

  return (
    <DefaultText
      style={[{ color }, { fontWeight: "300", fontSize: 16 }, style]}
      {...otherProps}
    />
  );
}

export function TextInput(props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const [color, backgroundColor] = useThemeColor([
    { colorName: "text", overrides: { light: lightColor, dark: darkColor } },
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
  ]);

  return (
    <DefaultTextInput
      style={[
        {
          color,
          backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

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
