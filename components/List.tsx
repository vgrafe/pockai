import { ThemeProps, useThemeColor } from "@/lib/theme";
import { StyleSheet, TouchableHighlightProps, Pressable } from "react-native";
import { View, ViewProps } from "react-native";

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
  item: {
    borderColor: "#7777",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 12,
  },
});

export default {
  Item,
};
