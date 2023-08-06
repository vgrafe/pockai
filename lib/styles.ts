import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    ...Platform.select({
      web: {
        maxWidth: 600,
        marginHorizontal: "auto",
      },
    }),
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
