import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoProps {
  title: string;
  items: TodoItem[];
  onAddItem: (title: string, dueDate?: string) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function Todo({ title, items, onAddItem, onToggleItem, onDeleteItem }: TodoProps) {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDueDate, setNewItemDueDate] = useState('');

  const handleAddItem = () => {
    if (newItemTitle.trim()) {
      onAddItem(newItemTitle.trim(), newItemDueDate.trim() || undefined);
      setNewItemTitle('');
      setNewItemDueDate('');
    }
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggleItem(item.id)}
      >
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.completed ? '#4A90E2' : '#666'}
        />
      </TouchableOpacity>
      <View style={styles.todoItemContent}>
        <Text
          style={[
            styles.todoItemTitle,
            item.completed && styles.todoItemTitleCompleted,
          ]}
        >
          {item.title}
        </Text>
        {item.dueDate && (
          <Text style={styles.todoItemDueDate}>{item.dueDate}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newItemTitle}
          onChangeText={setNewItemTitle}
          placeholder="Add new item..."
          returnKeyType="next"
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          value={newItemDueDate}
          onChangeText={setNewItemDueDate}
          placeholder="Due date (optional)"
          returnKeyType="done"
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity
          style={[styles.addButton, !newItemTitle && styles.addButtonDisabled]}
          onPress={handleAddItem}
          disabled={!newItemTitle}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 2,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateInput: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkbox: {
    marginRight: 12,
  },
  todoItemContent: {
    flex: 1,
  },
  todoItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  todoItemTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoItemDueDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
}); 