import GLOBAL_STYLES from "@/src/constants/styles";
import { Router, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const router: Router = useRouter();

  return (
      <View
        style={styles.container}
      >
        <Text style={styles.appHeader}>HourGlass</Text>
        
        <View style={styles.buttonRow}>
          <Pressable style={styles.createProjectButton} onPress={() => router.navigate('/project/create')}>
            <Text style={styles.createProjectButtonText}>+ Create new project</Text>
          </Pressable>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.container,
    flex: 1,
    margin: '5%',
    marginTop: '15%',
  },
  appHeader: {
    marginVertical: '5%',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonRow: {
    flex: 1,
    alignItems: 'center'
  },
  createProjectButton: {
    backgroundColor: 'limegreen',
    padding: 8,
    borderRadius: 10
  },
  createProjectButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  }
});