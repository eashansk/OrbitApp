import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoredImage {
  uri: string;
  id: string;
  timestamp: number;
}

const IMAGE_DIRECTORY = `${FileSystem.documentDirectory}images/`;
const IMAGE_STORAGE_KEY = 'orbit_app_images';

// Ensure the images directory exists
const setupImageDirectory = async () => {
  const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIRECTORY);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_DIRECTORY, { intermediates: true });
  }
};

// Process and store an image
export const storeImage = async (id: string, uri: string) => {
  try {
    // Get existing images
    const existingImages = await getStoredImages();
    
    // Add or update the image
    existingImages[id] = uri;
    
    // Save back to storage
    await AsyncStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(existingImages));
    
    return uri;
  } catch (error) {
    console.error('Error storing image:', error);
    throw error;
  }
};

// Get an image from storage
export const getStoredImage = async (id: string): Promise<string | null> => {
  try {
    const images = await getStoredImages();
    return images[id] || null;
  } catch (error) {
    console.error('Error getting stored image:', error);
    return null;
  }
};

// Delete an image from storage
export const deleteStoredImage = async (imageId: string): Promise<void> => {
  const imagePath = `${IMAGE_DIRECTORY}${imageId}.jpg`;
  const imageInfo = await FileSystem.getInfoAsync(imagePath);
  if (imageInfo.exists) {
    await FileSystem.deleteAsync(imagePath);
  }
};

// Get all stored images
export const getAllStoredImages = async (): Promise<StoredImage[]> => {
  await setupImageDirectory();
  const files = await FileSystem.readDirectoryAsync(IMAGE_DIRECTORY);
  
  return files
    .filter(file => file.endsWith('.jpg'))
    .map(file => ({
      uri: `${IMAGE_DIRECTORY}${file}`,
      id: file.replace('.jpg', ''),
      timestamp: parseInt(file.split('_')[1], 10),
    }))
    .sort((a, b) => b.timestamp - a.timestamp);
};

const getStoredImages = async (): Promise<Record<string, string>> => {
  try {
    const stored = await AsyncStorage.getItem(IMAGE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error getting stored images:', error);
    return {};
  }
}; 