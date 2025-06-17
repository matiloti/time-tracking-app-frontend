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

const defaultDropdownStyles: DropdownStyles = StyleSheet.create({
    dropdownBox: {
        marginBottom: 10
    }
});

const defaultDropdownErrorStyles: DropdownStyles = StyleSheet.create({
    dropdownBox: {
        borderColor: 'red',
    }
});

export { defaultDropdownErrorStyles, defaultDropdownStyles, defaultStyle };

