import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, DayProps } from 'react-native-calendars';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  date: string;
}

export default function EventsScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: colors.primary,
    },
  };

  const todayEvents: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      time: '10:00 AM',
      location: 'Conference Room A',
      date: selectedDate,
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:00 PM',
      location: 'Virtual Meeting',
      date: selectedDate,
    },
  ];

  const upcomingEvents: Event[] = [
    {
      id: '3',
      title: 'Client Presentation',
      time: '11:00 AM',
      location: 'Conference Room B',
      date: '2024-03-20',
    },
    {
      id: '4',
      title: 'Team Building',
      time: '3:00 PM',
      location: 'Central Park',
      date: '2024-03-22',
    },
  ];

  const handleDayPress = (day: DayProps) => {
    setSelectedDate(day.dateString);
  };

  const renderEvent = (event: Event) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <View style={styles.eventTime}>
        <Text style={styles.eventTimeText}>{event.time}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: colors.background,
          textSectionTitleColor: colors.text.secondary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.background,
          todayTextColor: colors.primary,
          dayTextColor: colors.text.primary,
          textDisabledColor: colors.text.tertiary,
          dotColor: colors.primary,
          selectedDotColor: colors.background,
          arrowColor: colors.primary,
          monthTextColor: colors.text.primary,
          indicatorColor: colors.primary,
        }}
      />
      <ScrollView style={styles.eventsList}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Events</Text>
          {todayEvents.map(renderEvent)}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map(renderEvent)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eventsList: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.card.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...colors.card.shadow,
  },
  eventTime: {
    width: 80,
    justifyContent: 'center',
  },
  eventTimeText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  eventLocation: {
    ...typography.caption,
    color: colors.text.secondary,
  },
}); 