// app/(tabs)/Index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Define a type for activity data
interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

// Sample activity data for the FlatList
const ACTIVITY_DATA: Activity[] = [
  {
    id: '1',
    title: 'Project Update',
    description: 'Shared some progress details',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Family Meetup',
    description: 'Plan dinner for tomorrow',
    time: '5h ago',
  },
];

export default function HomeScreen() {
  // State to hold the selected image URI
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to launch the image picker from the media library
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    // For expo-image-picker v13+, check the "canceled" flag (one “l”) and use result.assets
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Render function for each activity item in the FlatList
  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.cardTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>

      {/* Image Picker Area */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>Tap to add image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Optionally, you can also provide a button */}
      <Button title="Pick an Image" onPress={pickImage} />

      {/* Activity List */}
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <FlatList
        data={ACTIVITY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardTime: {
    marginTop: 4,
    color: '#999',
  },
});
