import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeImage, getStoredImage } from '../utils/imageStorage';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

// Types
interface Category {
  id: string;
  label: string;
}

interface PriorityConnection {
  id: string;
  name: string;
  imageId?: string;
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
  { id: '1', name: 'Dad', imageId: undefined, status: 'online', category: 'Family' },
  { id: '2', name: 'Mom', imageId: undefined, status: 'online', category: 'Family' },
  { id: '3', name: 'Boss', imageId: undefined, category: 'Work' },
  { id: '4', name: 'John', imageId: undefined, category: 'Friends' },
  { id: '5', name: 'Sarah', imageId: undefined, category: 'Work' },
  { id: '6', name: 'Mike', imageId: undefined, category: 'Networking' },
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

  const pickImage = async (connectionId: string) => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to change the connection picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const storedImageResult = await storeImage(connectionId, result.assets[0].uri);
        // Update the connection's image in your data store
        // This is where you would typically update your backend or local storage
        console.log('Stored image for connection:', connectionId, storedImageResult);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error selecting the image. Please try again.'
      );
      console.error('Error picking image:', error);
    }
  };

  const renderCategory = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.filterButton,
        activeFilter === category.label && styles.filterButtonActive,
      ]}
      onPress={() => setActiveFilter(category.label)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === category.label && styles.filterTextActive,
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const renderPriorityConnection = ({ item }: { item: PriorityConnection }) => (
    <TouchableOpacity
      style={styles.connectionItem}
      onPress={() => pickImage(item.id)}
    >
      <View style={styles.avatarContainer}>
        {item.imageId ? (
          <Image 
            source={{ uri: item.imageId }} 
            style={styles.avatar} 
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
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
        <View style={styles.avatarPlaceholder}>
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
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterButton,
              activeFilter === category.label && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(category.label)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === category.label && styles.filterTextActive,
              ]}
            >
              {category.label}
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
              contentContainerStyle={styles.connectionsList}
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
              contentContainerStyle={styles.eventsList}
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
    backgroundColor: colors.background,
  } as ViewStyle,
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  } as ViewStyle,
  logo: {
    width: 100,
    height: 40,
  } as ImageStyle,
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: '#f0f0f0',
  } as ViewStyle,
  filterButtonActive: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  filterText: {
    ...typography.caption,
    color: colors.text.secondary,
  } as TextStyle,
  filterTextActive: {
    color: colors.background,
  } as TextStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  } as TextStyle,
  connectionsList: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  } as ViewStyle,
  connectionItem: {
    alignItems: 'center',
    marginRight: spacing.xxl,
  } as ViewStyle,
  avatarContainer: {
    position: 'relative',
    width: 60,
    height: 60,
  } as ViewStyle,
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.full,
  } as ImageStyle,
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.full,
  } as ViewStyle,
  avatarText: {
    ...typography.h2,
    color: colors.text.secondary,
  } as TextStyle,
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
    backgroundColor: colors.status.online,
    borderWidth: 2,
    borderColor: colors.background,
  } as ViewStyle,
  connectionName: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.text.primary,
  } as TextStyle,
  activityCard: {
    backgroundColor: colors.card.background,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: colors.card.shadow.color,
    shadowOffset: colors.card.shadow.offset,
    shadowOpacity: colors.card.shadow.opacity,
    shadowRadius: colors.card.shadow.radius,
    elevation: 2,
  } as ViewStyle,
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  activityContent: {
    flex: 1,
  } as ViewStyle,
  activityTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  } as TextStyle,
  activityDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  } as TextStyle,
  timestamp: {
    ...typography.small,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  } as TextStyle,
  eventCard: {
    backgroundColor: colors.card.background,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.card.shadow.color,
    shadowOffset: colors.card.shadow.offset,
    shadowOpacity: colors.card.shadow.opacity,
    shadowRadius: colors.card.shadow.radius,
    elevation: 2,
  } as ViewStyle,
  eventDate: {
    width: 50,
    alignItems: 'center',
    marginRight: spacing.lg,
    backgroundColor: '#F0F7FF',
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  } as ViewStyle,
  eventDay: {
    ...typography.h2,
    color: colors.primary,
  } as TextStyle,
  eventMonth: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  } as TextStyle,
  eventContent: {
    flex: 1,
  } as ViewStyle,
  eventTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  } as TextStyle,
  eventType: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  } as TextStyle,
  eventsList: {
    paddingBottom: spacing.xxl,
  } as ViewStyle,
});
