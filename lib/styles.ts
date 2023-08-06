import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    maxWidth: 600,
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
