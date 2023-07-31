/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme, Animated } from "react-native";

import { ViewProps } from "./View";
import { Text } from "./Text";
import { useEffect, useRef } from "react";

const ANIMATE = false;

const FadeInView = (
  props: ViewProps & { direction: "flex-end" | "flex-start" }
) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATE ? 350 : 0,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const factor = props.direction === "flex-end" ? 1 : -1;

  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [factor * 50, 0],
              }),
            },
          ],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

export function Bubble(
  props: ViewProps & {
    backgroundColor: "blue" | "gray";
    alignSelf: "flex-end" | "flex-start";
    children: string;
    onPress?: () => void;
  }
) {
  const {
    style,
    lightColor,
    darkColor,
    alignSelf,
    backgroundColor,
    children,
    onPress,
    ...otherProps
  } = props;

  const theme = useColorScheme() ?? "light";

  const colors = {
    light: { blue: "#99f", gray: "#ddd" },
    dark: { blue: "#0A84FF", gray: "#333" },
  };

  return (
    <FadeInView
      direction={alignSelf}
      style={[
        {
          alignSelf,
          paddingVertical: 4,
          paddingHorizontal: 6,
          borderRadius: 6,
          maxWidth: "95%",
          marginVertical: 4,
          backgroundColor: colors[theme][backgroundColor],
        },
        style,
      ]}
      {...otherProps}
    >
      <Text
        style={{
          fontSize: 18,
        }}
        onPress={onPress}
      >
        {children}
      </Text>
    </FadeInView>
  );
}
