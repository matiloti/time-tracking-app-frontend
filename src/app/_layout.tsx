import { Stack } from "expo-router";
import "../global.css"
import { useColorScheme } from "react-native";
import { getTheme } from "@/constants/theme";

export default function RootLayout() {                                                                                                                                                                                                                                                                             
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark)
  return (
      <Stack screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 20,
          color: theme.text
        },
      }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" ,contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" }}}/>
          <Stack.Screen name="project/create" options={{title: 'Create Project', contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" }}}/>
          <Stack.Screen name="project/[id]" options={{title: '', contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" }}}/>
          <Stack.Screen name="milestone/[id]" options={{title: '', contentStyle: { backgroundColor: isDark ? "#111" : "whitesmoke" }}}/>
      </Stack>
  );
}