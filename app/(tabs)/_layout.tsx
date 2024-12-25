import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF', // Active icon color (white)
        tabBarInactiveTintColor: '#FFFFFF', // Inactive icon color (also white for consistency)
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#004D11', // Tab bar background color
            borderTopColor: 'transparent', // Removes border for a cleaner look
            paddingTop: 10, // Add 10px padding to the top of the bar
            height: 80, // Adjust height to account for padding
          },
          default: {
            backgroundColor: '#004D11', // Tab bar background color for Android
            borderTopColor: 'transparent', // Removes border for a cleaner look
            paddingTop: 10, // Add 10px padding to the top of the bar
            height: 80, // Adjust height to account for padding
          },
        }),
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
