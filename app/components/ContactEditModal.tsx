import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact, RelationshipType } from '../types';

interface ContactEditModalProps {
  visible: boolean;
  contact?: Contact;
  onClose: () => void;
  onSave: (contact: Contact) => void;
}

const relationshipTypes: RelationshipType[] = ['Family', 'Friend', 'Work', 'Other'];

export function ContactEditModal({ visible, contact, onClose, onSave }: ContactEditModalProps) {
  const [editedContact, setEditedContact] = useState<Contact>(
    contact || {
      id: Date.now().toString(),
      name: '',
      phoneNumber: '',
      email: '',
      relationship: 'Other',
    }
  );

  const handleSave = () => {
    onSave(editedContact);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {contact ? 'Edit Contact' : 'New Contact'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={editedContact.name}
                onChangeText={(text) =>
                  setEditedContact({ ...editedContact, name: text })
                }
                placeholder="Enter name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={editedContact.phoneNumber}
                onChangeText={(text) =>
                  setEditedContact({ ...editedContact, phoneNumber: text })
                }
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editedContact.email}
                onChangeText={(text) =>
                  setEditedContact({ ...editedContact, email: text })
                }
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Relationship</Text>
              <View style={styles.relationshipButtons}>
                {relationshipTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.relationshipButton,
                      editedContact.relationship === type &&
                        styles.relationshipButtonActive,
                    ]}
                    onPress={() =>
                      setEditedContact({ ...editedContact, relationship: type })
                    }
                  >
                    <Text
                      style={[
                        styles.relationshipButtonText,
                        editedContact.relationship === type &&
                          styles.relationshipButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput
                style={styles.input}
                value={editedContact.birthday}
                onChangeText={(text) =>
                  setEditedContact({ ...editedContact, birthday: text })
                }
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={editedContact.notes}
                onChangeText={(text) =>
                  setEditedContact({ ...editedContact, notes: text })
                }
                placeholder="Add notes..."
                multiline
                numberOfLines={4}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  relationshipButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  relationshipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 4,
  },
  relationshipButtonActive: {
    backgroundColor: '#4A90E2',
  },
  relationshipButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  relationshipButtonTextActive: {
    color: '#fff',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 