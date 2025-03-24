// app/communities.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const dummyCommunities = [
  { id: '1', name: 'Tech Enthusiasts', description: 'Community for tech lovers' },
  { id: '2', name: 'Writers Hub', description: 'Connect with fellow writers' },
];

export default function CommunitiesEventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communities & Events</Text>
      <FlatList
        data={dummyCommunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { fontSize: 28, color: '#fff' },
});
