import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { DropdownOption, DropdownStyles } from "../../Dropdown/types";
import { ValidationRule } from "../types";

interface FormDropdownStyles extends DropdownStyles {
    fieldGroup?: StyleProp<ViewStyle>
    fieldGroupError?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
    labelError?: StyleProp<TextStyle>
    dropdown?: DropdownStyles
    dropdownError?: DropdownStyles
    errorMsg?: StyleProp<TextStyle>
}

interface FormDropdownProps<T> {
    name: string,
    label?: string,
    options: DropdownOption<T>[]
    placeholder: string
    validationRules?: ValidationRule[]
    style?: FormDropdownStyles
}

export { FormDropdownProps, FormDropdownStyles };

