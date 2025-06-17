import { StyleSheet } from "react-native";

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
        color: 'red',
    },
    textInput: {
        borderWidth: 0,
        marginBottom: 10,
        borderRadius: 5
    },
    textInputError: {
        color: 'red',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5
    },
    errorMsg: {
        color: 'red',
        fontSize: 11,
    }
});

export { defaultStyle };

