import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
  return (
      <Stack screenOptions={{
        headerTransparent: true,
        contentStyle: {backgroundColor: 'red'}
      }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }}/>
          <Stack.Screen name="project" options={{title: 'Create project'}}/>
      </Stack>
  );
}