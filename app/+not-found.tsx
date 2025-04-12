// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Home Tab – should match file (tabs)/Index.tsx exactly */}
      <Tabs.Screen
        name="(tabs)/Index" 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Events Tab – matches (tabs)/Events.tsx */}
      <Tabs.Screen
        name="(tabs)/Events"
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      {/* Chat Tab – matches (tabs)/chat.tsx */}
      <Tabs.Screen
        name="(tabs)/chat"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab – matches (tabs)/Profile.tsx */}
      <Tabs.Screen
        name="(tabs)/Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
