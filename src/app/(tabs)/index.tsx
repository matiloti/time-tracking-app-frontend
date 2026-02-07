import ThemedText from "@/components/atoms/ThemedText";
import GLOBAL_STYLES from "@/constants/styles";
import { findAllProjects } from "@/services/project";
import { Project } from "@/services/types/Project";
import { Router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView>
        <ThemedText text="What are you working on?" className="text-5xl font-bold m-10 dark:color-gray-200"/>
      </SafeAreaView>
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