import ThemedText from "@/components/atoms/ThemedText";
import { findAllProjects } from "@/services/project";
import { Project } from "@/services/types/Project";
import { Router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [ projects, setProjects ] = useState<Project[]>([]);
    const router: Router = useRouter();

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

  useEffect(() => {
    console.log(projects)
  }, [projects])
  const [visible, setVisible] = useState(true);

  return (
    <SafeAreaView>
        <ScrollView className="mt-20 h-full flex flex-col  ">
          <FlatList 
              data={projects}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => console.log(item)}
                  style={{
                    backgroundColor: 'white',
                    shadowColor: '#555',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.15,
                    shadowRadius: 15,
                    flex: 1,
                    width: 300,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 100,
                    borderRadius: 20,
                    padding: 40
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.categoryId}</Text>
                </TouchableOpacity>
              )}
          />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  backgroundImage: {
    position: 'absolute',
  },
  glassView: {
    position: 'absolute',
    zIndex: 100,
    width: 200,
    top:100,
    height: 120,
    borderRadius: 12,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});