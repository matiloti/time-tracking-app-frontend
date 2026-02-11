import ThemedText from "@/components/atoms/ThemedText";
import { CATEGORIES } from "@/constants/categories";
import { getTheme } from "@/constants/theme";
import { listAllProjects } from "@/services/project";
import { ProjectItem } from "@/services/types/Project";
import { useFocusEffect } from "@react-navigation/native";
import { Router, Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function Index() {
  const [ projects, setProjects ] = useState<ProjectItem[]>([]);                                                                                                                                                                                                                                                      
  const [refreshing, setRefreshing] = useState(false);      
  const router: Router = useRouter();                                                                                                                                                                                                                                                                               
  const isDark = useColorScheme() === 'dark';
  const theme = getTheme(isDark)

  const fetchProjects = async () => {
    try {
      setProjects(await listAllProjects());
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProjects();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [])
  );

  return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        { projects.map((item, i) => (
          <TouchableOpacity
            key={`${item}${i}`}
            onPress={() => router.push({pathname: "/project/[id]", params: {id: item.id}})}
            style={{
              backgroundColor: theme.backgroundSecondary,
              shadowColor: '#555',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 15,
              flex: 1,
              width: 350,
              height: 100,
              justifyContent: 'space-between',
              marginBottom: i == (projects.length - 1) ? 30 : 20,
              marginTop: i == 0 ? 30 : 20,
              borderRadius: 20,
              padding: 20,
              alignSelf: 'center',
            }}
          >
            <View className="flex-row items-center justify-start w-full">
              <View className={`${CATEGORIES[item.categoryId].bgColor} w-2 h-2 rounded-full`}/>
              <ThemedText text={`${CATEGORIES[item.categoryId].en}`} lightThemeColor={`${CATEGORIES[item.categoryId].textColor}`} darkThemeColor={`${CATEGORIES[item.categoryId].textColor}`} className={`rounded-2xl self-start text-left ml-2`}/>
            </View>
            <ThemedText text={item.name} className="font-bold text-2xl"/>
          </TouchableOpacity>
        ))}
        <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon='plus' onPress={() => router.push("/project/create")}/>
        </Stack.Toolbar>
      </ScrollView>
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