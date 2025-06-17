import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ButtonStyles } from "./types";

function getButtonStyle(
    pressedIn: boolean,
    defaultStyle: ButtonStyles,
    style: ButtonStyles | undefined
): StyleProp<ViewStyle> {
    if(pressedIn) {
        return StyleSheet.compose(StyleSheet.compose(defaultStyle.button, style?.button) as ViewStyle, { filter: 'brightness(90%)' });
    } else {
        return StyleSheet.compose(defaultStyle.button, style?.button);
    }
}

export { getButtonStyle };

