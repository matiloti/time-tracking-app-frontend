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
          headerTransparent: true,
          title: "Projects",
          headerTitleStyle: {
            fontSize: 40,
            color: theme.text
          },
          contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" }
        }
      }/>
    )
}