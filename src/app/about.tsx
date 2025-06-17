import { StyleSheet, Text, TextInput, View } from "react-native";


export default function CreateProject() {
    return (
        <View>
            <Text style={styles.header}>About</Text>
            
            <Text>Hey!!</Text>
            <TextInput/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    fieldName: {
        fontWeight: 'bold'
    }
})