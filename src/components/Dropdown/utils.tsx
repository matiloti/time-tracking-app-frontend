import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { DropdownStyles } from "./types";

function getContainerStyle(
    dropdownWidth: number, 
    defaultStyle: DropdownStyles, 
    style: DropdownStyles | undefined
): StyleProp<ViewStyle> {
    return StyleSheet.compose(
        StyleSheet.compose(defaultStyle.container, style?.container) as StyleProp<ViewStyle>, 
        { width: dropdownWidth }
    );
}

function getModalStyle(
    visible: boolean, 
    dropdownWidth: number, 
    defaultStyle: DropdownStyles, 
    style: DropdownStyles | undefined
): StyleProp<ViewStyle> {
    if(visible) {
        return StyleSheet.compose(
            StyleSheet.compose(defaultStyle.dropdownModal, style?.dropdownModal) as StyleProp<ViewStyle>, 
            { width: dropdownWidth, height: 200 }
        );
    } else {
        return  { display: 'none'};
    }
}

function getSelectedTextStyle(
    isPlaceholder: boolean | undefined, 
    defaultStyle: DropdownStyles, 
    style: DropdownStyles | undefined
): StyleProp<TextStyle> {
    if(isPlaceholder) {
        return StyleSheet.compose(defaultStyle.dropdownPlaceholder, style?.dropdownPlaceholder)
    } else {
        return StyleSheet.compose(defaultStyle.dropdownSelectedText, style?.dropdownSelectedText);   
    }
}

export { getContainerStyle, getModalStyle, getSelectedTextStyle };

