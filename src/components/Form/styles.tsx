import { StyleSheet } from "react-native";


const defaultStyle = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    fieldsContainer: {
        flex: 1,
        marginBottom: '5%'
    },
})

const defaultButtonStyles = StyleSheet.create({
    button: {
        backgroundColor: 'limegreen',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    }
});

export { defaultButtonStyles, defaultStyle };

