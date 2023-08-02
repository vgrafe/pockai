import { ThemeProps, useThemeColor } from "@/lib/theme";
import { StyleSheet, TouchableHighlightProps, Pressable } from "react-native";
import { View, ViewProps } from "react-native";

const Container = (props: ViewProps) => {
  const { style, ...otherProps } = props;
  return <View style={[styles.container, style]} {...otherProps} />;
};

const Item = (
  props: ThemeProps &
    ViewProps & {
      onPress?: TouchableHighlightProps["onPress"];
    }
) => {
  const { style, lightColor, darkColor, onPress, ...otherProps } = props;

  const [backgroundColor] = useThemeColor([
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
  ]);

  if (onPress)
    return (
      <Pressable onPress={onPress}>
        <View
          style={[styles.item, { backgroundColor }, style]}
          {...otherProps}
        />
      </Pressable>
    );
  return (
    <View style={[styles.item, { backgroundColor }, style]} {...otherProps} />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderColor: "#7777",
    borderWidth: 1,
    borderRadius: 4,
  },
  item: {
    borderColor: "#7777",
    borderBottomWidth: 1,
    padding: 12,
  },
});

export default {
  Container,
  Item,
};
