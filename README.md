# OrbitApp

A React Native mobile application for managing connections, events, and communication within your professional and personal networks.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eashansk/OrbitApp.git
cd OrbitApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Development Focus Areas

### Priority: Chat Functionality
The chat page needs significant development. Focus areas include:

1. Chat Features to Implement:
   - Real-time messaging system
   - Message history and persistence
   - Chat room creation for group discussions
   - Direct messaging between connections
   - Message status indicators (sent, delivered, read)
   - Media sharing capabilities (images, documents)

2. Chat UI Components:
   - Message bubbles with timestamps
   - User avatars in chat
   - Typing indicators
   - Message input with attachment options
   - Chat room list with last message preview

### User Navigation Improvements

1. Navigation Structure:
   - Implement deep linking
   - Add navigation between user profiles
   - Create smooth transitions between screens
   - Add gesture-based navigation

2. User Flow Enhancements:
   - Connection request flow
   - Event invitation flow
   - Profile viewing and editing flow
   - Settings and preferences navigation

## Current Features

- Bottom tab navigation (Home, Events, Chat, Profile)
- Category filtering (All, Family, Work, Friends, Networking)
- Priority connections display
- Recent activities feed
- Upcoming events list
- Profile management with image upload
- Contact integration

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Router
- React Native Reanimated

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Create a pull request with detailed description

## Known Issues

- TypeScript configuration needs updating
- Some package versions need to be aligned with Expo requirements
- Navigation configuration requires optimization

## Next Steps

1. Chat Implementation:
   - Set up WebSocket connection for real-time messaging
   - Design and implement chat UI components
   - Add message persistence with local storage
   - Implement push notifications for new messages

2. Navigation Enhancements:
   - Add screen transitions
   - Implement gesture navigation
   - Create navigation guards for authenticated routes
   - Add deep linking support

## Contact

For questions or collaboration, reach out to the repository owner. 