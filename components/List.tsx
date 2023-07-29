import { View, ViewProps, StyleSheet } from "react-native";

export const List = (props: ViewProps) => {
  const { style, ...otherProps } = props;
  return <View style={[styles.container, style]} {...otherProps} />;
};

export const ListItem = (props: ViewProps) => {
  const { style, ...otherProps } = props;
  return <View style={[styles.item, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#8888",
    borderWidth: 1,
    borderRadius: 4,
  },
  item: {
    borderColor: "#8888",
    borderBottomWidth: 1,
    padding: 12,
  },
});
