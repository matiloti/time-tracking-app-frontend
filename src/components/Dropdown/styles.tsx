import { StyleSheet } from "react-native";

const defaultStyle = StyleSheet.create({
    container: {
        position: 'relative'
    },
    dropdownBox: {
        zIndex: 2,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'rgb(242, 242, 242)',
    },
    dropdownPlaceholder: {
        color: 'gray',
        fontStyle: 'italic'
    },
    dropdownSelectedText: {
        color: 'black',
        fontStyle: 'normal',
    },
    dropdownModal: {
        zIndex: 1,
        position: 'absolute',
        top: 35,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 5,
        backgroundColor: 'rgb(242, 242, 242)',
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
    },
    dropdownOptionText: {
    }
});

export { defaultStyle };

