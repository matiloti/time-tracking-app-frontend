import GLOBAL_STYLES from "@/src/constants/styles";
import { findAllProjects } from "@/src/services/project";
import { Project } from "@/src/services/types/Project";
import { Router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router: Router = useRouter();
  const [ projects, setProjects ] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setProjects(await findAllProjects());
      } catch(error) {
        console.error(error);
      }
    };

    getProjects();
  }, []);

  return (
      <View
        style={styles.container}
      >
        <Text style={styles.appHeader}>HourGlass</Text>

        <View>
          <View style={styles.projectsHeaderContainer}>
            <Text style={styles.projectsTitle}>Projects</Text>
            <Pressable style={styles.createProjectButton} onPress={() => router.navigate('/project/create')}>
              <Text style={styles.createProjectButtonText}>+</Text>
            </Pressable>
          </View>
          <FlatList 
              data={[{id: -1, name: "Name", description: "Description", categoryId: "Category", createdAt: "Date"},...projects]}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item, index }) => (
                index === 0 ? <View style={styles.projectHeader}>
                    <Text style={styles.projectHeaderItem}>{item.name}</Text>
                    <Text style={styles.projectHeaderItem}>{item.description}</Text>
                    <Text style={styles.projectHeaderItem}>{item.categoryId}</Text>
                    <Text style={styles.projectHeaderItem}>{item.createdAt}</Text>
                </View> :
                <TouchableOpacity
                    onPress={() => console.log(item)}
                    style={styles.projectsRow}
                >
                    <Text style={styles.projectItem}>{item.name}</Text>
                    <Text style={styles.projectItem}>{item.description}</Text>
                    <Text style={styles.projectItem}>{item.categoryId}</Text>
                    <Text style={styles.projectItem}>{item.createdAt}</Text>
                </TouchableOpacity>
              )}
          />
        </View>
        
        <View style={styles.buttonRow}>
          
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.container,
    flex: 1,
    margin: '0%',
    marginTop: '0%',
  },
  appHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  buttonRow: {
    flex: 1,
    alignItems: 'center'
  },
  projectsHeaderContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createProjectButton: {
    backgroundColor: 'limegreen',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40
  },
  createProjectButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    padding: 'auto'
  },
  projectsTitle: {
    fontSize: 30, 
    color: 'gray'
  },
  projectsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  projectItem: {
    flex: 1,
    textAlign: 'center',
  },
  projectHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  projectHeaderItem: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});