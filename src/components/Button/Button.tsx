import { useMemo, useState } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { defaultStyle } from "./styles";
import { ButtonProps } from "./types";
import { getButtonStyle } from "./utils";

export default function Button({
    text,
    onPress,
    style
}: ButtonProps) {
    const [pressedIn, setPressedIn] = useState(false);

    const BUTTON_STYLE: StyleProp<ViewStyle> = useMemo(
        () => getButtonStyle(
            pressedIn,
            defaultStyle,
            style
        ),
        [pressedIn, style]
    );

    const TEXT_STYLE: StyleProp<TextStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.text, style?.text),
        [style]
    );

    return (
        <Pressable 
            style={BUTTON_STYLE}
            onPress={onPress}
            onPressIn={() => setPressedIn(true)}
            onPressOut={() => setPressedIn(false)}
        >
            <Text style={TEXT_STYLE}>{text}</Text>
        </Pressable>
    );
}