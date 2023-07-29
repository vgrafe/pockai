/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { TextInput as DefaultTextInput } from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";

export type InputProps = ThemeProps & DefaultTextInput["props"];

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
