import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="project/create" options={{title: 'Create project'}}/>
      </Stack>
  );
}