import {
  StyleSheet,
  Pressable,
  View,
  ViewProps,
  PressableProps,
} from "react-native";
import { ThemeProps, useThemeColor } from "../lib/theme";
import { Text } from "./Text";

export type ButtonProps = ThemeProps &
  PressableProps & { title: string; style?: ViewProps["style"] };

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, title, style, ...otherProps } = props;
  const [textColor, backgroundColor] = useThemeColor([
    { colorName: "text", overrides: { light: lightColor, dark: darkColor } },
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
  ]);

  return (
    <Pressable {...otherProps}>
      <View style={[{ backgroundColor }, baseStyle.button, style]}>
        <Text style={[{ color: textColor }, baseStyle.text]}>{title}</Text>
      </View>
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
