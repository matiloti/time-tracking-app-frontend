import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { getTheme } from "@/constants/theme";

export default function ProjectsLayout() {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);

    return <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.background },
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
      }}>
          <Stack.Screen name="create" options={{ title: 'Create project' }}/>
      </Stack>
}