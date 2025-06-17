import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native"

interface ButtonStyles {
    button?: StyleProp<ViewStyle>,
    text?: StyleProp<TextStyle>
}

interface ButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void,
    style?: ButtonStyles
}

export { ButtonProps, ButtonStyles }

