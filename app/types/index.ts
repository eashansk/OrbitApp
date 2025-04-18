// Contact Types
export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  relationship: RelationshipType;
  birthday?: string;
  notes?: string;
  image?: string;
}

export type RelationshipType = 'Family' | 'Friend' | 'Work' | 'Other';

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
}

export type EventType = 'Personal' | 'Work' | 'Community';

// Interaction Types
export interface Interaction {
  id: string;
  contactId: string;
  type: InteractionType;
  date: string;
  notes?: string;
}

export type InteractionType = 'Call' | 'Meeting' | 'Message' | 'Other';

// User Profile Type
export interface UserProfile {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  bio?: string;
} 