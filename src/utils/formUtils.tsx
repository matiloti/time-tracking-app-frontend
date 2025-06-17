import { StyleProp, StyleSheet } from "react-native";

function isValidString(value: string | null): boolean {
    return !!value && value.trim() !== '';
}

function isValidStringWithLength(value: string | null, maxLength: number): boolean {
    return isValidString(value) && value!.length <= maxLength;
}

function isValidDropdown(value: number | null): boolean {
    return !!value && value !== -1;
}

function getStyle(
    style: StyleProp<object>, 
    errorStyle: StyleProp<object>,
    fieldIsValid: boolean,
    showErrors: boolean
): StyleProp<any> {
    return showErrors && !fieldIsValid ? StyleSheet.compose(style, errorStyle) : style;
}

export { getStyle, isValidDropdown, isValidString, isValidStringWithLength };

