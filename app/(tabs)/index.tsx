import React, { useState, useMemo } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
interface Category {
  id: string;
  label: string;
}

interface PriorityConnection {
  id: string;
  name: string;
  image: string | null;
  status?: 'online' | 'offline';
  category: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
}

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  day: string;
  month: string;
  category: string;
}

// Sample data
const CATEGORIES: Category[] = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Family' },
  { id: '3', label: 'Work' },
  { id: '4', label: 'Friends' },
];

const PRIORITY_CONNECTIONS: PriorityConnection[] = [
  { id: '1', name: 'Dad', image: null, status: 'online', category: 'Family' },
  { id: '2', name: 'Mom', image: null, status: 'online', category: 'Family' },
  { id: '3', name: 'Boss', image: null, category: 'Work' },
  { id: '4', name: 'John', image: null, category: 'Friends' },
  { id: '5', name: 'Sarah', image: null, category: 'Work' },
  { id: '6', name: 'Mike', image: null, category: 'Networking' },
];

const ACTIVITY_DATA: Activity[] = [
  {
    id: '1',
    title: 'Sarah from Marketing',
    description: 'Shared a project update',
    timestamp: '2h ago',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Family Dinner',
    description: 'Event reminder for tomorrow',
    timestamp: '5h ago',
    category: 'Family',
  },
  {
    id: '3',
    title: 'Coffee Meetup',
    description: 'New networking event',
    timestamp: '1d ago',
    category: 'Networking',
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
    category: 'Work',
  },
  {
    id: '2',
    title: "Sister's Birthday",
    type: 'Family Event',
    date: '6:00 PM',
    day: '18',
    month: 'MAR',
    category: 'Family',
  },
];

const filters = ['All', 'Family', 'Work', 'Friends', 'Networking'];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredConnections = useMemo(() => {
    if (activeFilter === 'All') return PRIORITY_CONNECTIONS;
    return PRIORITY_CONNECTIONS.filter(
      (connection) => connection.category === activeFilter
    );
  }, [activeFilter]);

  const filteredActivities = useMemo(() => {
    if (activeFilter === 'All') return ACTIVITY_DATA;
    return ACTIVITY_DATA.filter(
      (activity) => activity.category === activeFilter
    );
  }, [activeFilter]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return EVENT_DATA;
    return EVENT_DATA.filter(
      (event) => event.category === activeFilter
    );
  }, [activeFilter]);

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
      console.log('Image selected:', result.assets[0].uri);
    }
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeFilter === item.label && styles.categoryButtonActive,
      ]}
      onPress={() => setActiveFilter(item.label)}
    >
      <Text
        style={[
          styles.categoryText,
          activeFilter === item.label && styles.categoryTextActive,
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
        <View style={[styles.activityAvatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarText}>{item.title[0]}</Text>
        </View>
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {filteredConnections.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Priority Connections</Text>
            <FlatList
              horizontal
              data={filteredConnections}
              renderItem={renderPriorityConnection}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              style={styles.connectionsList}
            />
          </>
        )}

        {filteredActivities.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <FlatList
              data={filteredActivities}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        )}

        {filteredEvents.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <FlatList
              data={filteredEvents}
              renderItem={renderEvent}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              style={styles.eventsList}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  connectionsList: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
