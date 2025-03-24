// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Friends & Family',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          tabBarLabel: 'Work & Business',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          tabBarLabel: 'Communities & Events',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-people-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
