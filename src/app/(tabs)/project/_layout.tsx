import { getTheme } from "@/constants/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProjectsLayout() {                                                                                                                                                                                                                                                                         
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark)
    return ( 
      <Stack 
        screenOptions={{
          contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" },
          headerTransparent: true,
          title: "Projects",
          headerTitleStyle: {
            fontSize: 20,
            color: theme.text
          },
        }
      }/>
    )
}