import { Text as DefaultText } from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";

export type TextProps = ThemeProps & {
  variant?: Variant;
} & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const [baseColor, variantColor] = useThemeColor([
    { colorName: "text", overrides: { light: lightColor, dark: darkColor } },
    { colorName: props.variant || "info" },
  ]);

  const color = props.variant ? variantColor : baseColor;

  return (
    <DefaultText
      style={[
        { color },
        { fontWeight: "300", fontSize: 16, lineHeight: 24 },
        style,
      ]}
      {...otherProps}
    />
  );
}
