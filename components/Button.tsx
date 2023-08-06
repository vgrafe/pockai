import { StyleSheet, Pressable, ViewProps, PressableProps } from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";
import { Text } from "./Text";

export type ButtonProps = ThemeProps &
  PressableProps & { title: string; style?: ViewProps["style"] };

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, title, style, ...otherProps } = props;

  const [backgroundColor] = useThemeColor([
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
  ]);

  return (
    <Pressable
      {...otherProps}
      style={[{ backgroundColor }, baseStyle.button, style]}
    >
      <Text style={baseStyle.text}>{title}</Text>
    </Pressable>
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
  },
  text: {
    fontWeight: "400",
    textAlign: "center",
  },
});
