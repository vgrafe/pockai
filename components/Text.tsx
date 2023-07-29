/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText } from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";

export type TextProps = ThemeProps & DefaultText["props"];

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
