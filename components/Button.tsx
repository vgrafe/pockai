import {
  StyleSheet,
  ViewProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";
import { Text } from "./Text";

export type ButtonProps = ThemeProps & {
  variant?: Variant;
} & TouchableOpacityProps & { title: string; style?: ViewProps["style"] };

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, title, style, ...otherProps } = props;

  const [baseBackgroundColor, variantBackgroundColor] = useThemeColor([
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
    { colorName: props.variant || "info" },
  ]);

  const backgroundColor = props.variant
    ? variantBackgroundColor
    : baseBackgroundColor;

  return (
    <TouchableOpacity
      {...otherProps}
      style={[{ backgroundColor }, baseStyle.button, style]}
    >
      <Text style={baseStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const baseStyle = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8888",
    cursor: "pointer",
    elevation: 2,
    alignSelf: "center",
  },
  text: {
    fontWeight: "400",
    textAlign: "center",
  },
});
