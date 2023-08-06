/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import Colors from "@/constants/Colors";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ThemeColorParams = {
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark;
  overrides?: { light?: string; dark?: string };
};

export function useThemeColor(params: ThemeColorParams[]) {
  const theme = useColorScheme() ?? "light";

  let result = [];

  for (const param of params) {
    const colorFromProps = param.overrides && param.overrides[theme];

    if (colorFromProps) {
      result.push(colorFromProps);
    } else {
      result.push(Colors[theme][param.colorName]);
    }
  }

  return result;
}
