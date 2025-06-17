import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface DropdownOption<T> {
    text: string,
    value: T | null,
    isPlaceholder?: boolean
}

interface DropdownStyles {
    container?: StyleProp<ViewStyle>,
    dropdownBox?: StyleProp<ViewStyle>,
    dropdownPlaceholder?: StyleProp<TextStyle>
    dropdownSelectedText?: StyleProp<TextStyle>
    dropdownModal?: StyleProp<ViewStyle>,
    dropdownOption?: StyleProp<ViewStyle>,
    dropdownOptionText?: StyleProp<TextStyle>
}

type DropdownSize = number | 'auto';

interface DropdownProps<T> {
    id?: string,
    options: DropdownOption<T>[],
    selected?: string,
    onSelect: (selectedOption: DropdownOption<T>) => void,
    placeholder?: string,
    style?: DropdownStyles,
    size?: DropdownSize,
}

export { DropdownOption, DropdownProps, DropdownSize, DropdownStyles };

