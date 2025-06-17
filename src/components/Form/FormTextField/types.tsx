import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ValidationRule } from "../types";

interface FormTextFieldStyles {
    fieldGroup?: StyleProp<ViewStyle>
    fieldGroupError?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
    labelError?: StyleProp<TextStyle>
    textInput?: StyleProp<TextStyle>
    textInputError?: StyleProp<TextStyle>
    errorMsg?: StyleProp<TextStyle>
}

interface PlaceholderColors {
    normal: ColorValue
    error: ColorValue
}

interface FormTextFieldProps {
    name: string
    label?: string
    placeholder: string
    multiline?: boolean
    validationRules?: ValidationRule[]
    style?: FormTextFieldStyles
    placeholderColors?: PlaceholderColors
}

export { FormTextFieldProps, FormTextFieldStyles, PlaceholderColors };

