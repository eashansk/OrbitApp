// app/(tabs)/Index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Define types
interface Category {
  id: string;
  label: string;
}

interface PriorityConnection {
  id: string;
  name: string;
  image: string | null;
  status?: 'online' | 'offline';
}

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  image?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  day: string;
  month: string;
}

// Sample data
const CATEGORIES: Category[] = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Family' },
  { id: '3', label: 'Work' },
  { id: '4', label: 'Friends' },
];

const PRIORITY_CONNECTIONS: PriorityConnection[] = [
  { id: '1', name: 'Dad', image: null, status: 'online' },
  { id: '2', name: 'Mom', image: null, status: 'online' },
  { id: '3', name: 'Boss', image: null },
];

const ACTIVITY_DATA: Activity[] = [
  {
    id: '1',
    title: 'Sarah from Marketing',
    description: 'Shared a project update',
    timestamp: '2h ago',
  },
  {
    id: '2',
    title: 'Family Dinner',
    description: 'Event reminder for tomorrow',
    timestamp: '5h ago',
  },
];

const EVENT_DATA: Event[] = [
  {
    id: '1',
    title: 'Team Building',
    type: 'Office Party',
    date: '3:00 PM',
    day: '15',
    month: 'MAR',
  },
  {
    id: '2',
    title: 'Sister\'s Birthday',
    type: 'Family Event',
    date: '6:00 PM',
    day: '18',
    month: 'MAR',
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const pickImage = async (connectionId?: string) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Here you would typically upload the image and update the connection's image
      console.log('Image selected:', result.assets[0].uri);
    }
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.label && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.label)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.label && styles.categoryTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderPriorityConnection = ({ item }: { item: PriorityConnection }) => (
    <TouchableOpacity
      style={styles.connectionItem}
      onPress={() => pickImage(item.id)}
    >
      <View style={styles.avatarContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        )}
        {item.status === 'online' && <View style={styles.onlineIndicator} />}
      </View>
      <Text style={styles.connectionName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.activityAvatar} />
        ) : (
          <View style={[styles.activityAvatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{item.title[0]}</Text>
          </View>
        )}
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDescription}>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventDate}>
        <Text style={styles.eventDay}>{item.day}</Text>
        <Text style={styles.eventMonth}>{item.month}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventType}>{item.type} • {item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.profilePic}
            source={{ uri: 'https://via.placeholder.com/40' }}
          />
          <Text style={styles.headerTitle}>Orbit</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      <Text style={styles.sectionTitle}>Priority Connections</Text>
      <FlatList
        horizontal
        data={PRIORITY_CONNECTIONS}
        renderItem={renderPriorityConnection}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.connectionsList}
      />

      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <FlatList
        data={ACTIVITY_DATA}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlatList
        data={EVENT_DATA}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        style={styles.eventsList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#4A90E2',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  connectionsList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  connectionItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: '#666',
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  connectionName: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDate: {
    width: 50,
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    padding: 8,
  },
  eventDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90E2',
  },
  eventMonth: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  eventsList: {
    paddingBottom: 24,
  },
});
