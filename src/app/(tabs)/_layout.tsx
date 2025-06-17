import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
    }}>
        <Tabs.Screen name="index" options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            )
          }}
        />
        <Tabs.Screen name='settings' options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={ focused ? 'settings-sharp' : 'settings-outline' } color={color} size={24} />
            )
        }}/>
        <Tabs.Screen name='about' options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={ focused ? 'settings-sharp' : 'settings-outline' } color={color} size={24} />
            )
        }}/>
    </Tabs>
  );
}