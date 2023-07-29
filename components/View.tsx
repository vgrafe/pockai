import { View as DefaultView } from "react-native";
import { ThemeProps, useThemeColor } from "./Themed";

export type ViewProps = ThemeProps & DefaultView["props"];

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const [backgroundColor] = useThemeColor([
    {
      colorName: "background",
      overrides: { light: lightColor, dark: darkColor },
    },
  ]);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
