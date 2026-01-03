import { StyleSheet } from "react-native";
import { DropdownStyles } from "../../Dropdown/types";

const defaultStyle = StyleSheet.create({
    fieldGroup: {
    },
    fieldGroupError: {

    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    labelError: {
        color: 'red'
    },
    errorMsg: {
        color: 'red',
        fontSize: 11,
    }
});

const defaultDropdownStyles = {
    dropdown: {

    } as DropdownStyles,
        dropdownError: {
            dropdownBox: {
                borderColor: 'red',
            },
            dropdownOption: {
                borderColor: 'red',
            },
            dropdownModal: {
                borderColor: 'red',
            },
            dropdownOptionText: {
                color: 'red'
            },
            dropdownSelectedText: {
                color: 'red'
            }
    } as DropdownStyles
};

export { defaultDropdownStyles, defaultStyle };
