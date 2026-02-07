import { NativeTabs } from 'expo-router/build/native-tabs';
import { useColorScheme } from 'react-native';
import { getTheme } from '@/constants/theme';

export default function TabsLayout() {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
  return (
      <NativeTabs>
          <NativeTabs.Trigger name="index" contentStyle={{ backgroundColor: theme.background }}>
              <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
              <NativeTabs.Trigger.Icon sf="house.fill" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="project" contentStyle={{ backgroundColor: theme.background }}>
              <NativeTabs.Trigger.Label>Projects</NativeTabs.Trigger.Label>
              <NativeTabs.Trigger.Icon sf="xmark.triangle.circle.square.fill" />
          </NativeTabs.Trigger>
      </NativeTabs>
  );
}