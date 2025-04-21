import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  imageId?: string;
}

export default function ChatScreen() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      imageId: '1',
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Meeting at 2 PM',
      timestamp: 'Yesterday',
      imageId: '2',
    },
  ]);

  const renderChat = ({ item }: { item: Chat }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?img=${item.imageId}` }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  chatItem: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.card.background,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...colors.card.shadow,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chatName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  timestamp: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  unreadCount: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '600',
  },
}); 