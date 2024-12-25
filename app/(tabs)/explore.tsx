import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// Define the type for an event
interface Event {
  id: string;
  title: string;
  description: string;
}

// Sample event data
const EVENTS: Event[] = [
  { id: '1', title: 'Event 1', description: 'This is the first event.' },
  { id: '2', title: 'Event 2', description: 'This is the second event.' },
  { id: '3', title: 'Event 3', description: 'This is the third event.' },
  { id: '4', title: 'Event 4', description: 'This is the fourth event.' },
  { id: '5', title: 'Event 5', description: 'This is the fifth event.' },
  { id: '6', title: 'Event 6', description: 'This is the sixth event.' },
];

export default function EventsScreen() {
  // Set up the video player
  const player = useVideoPlayer(require('../../assets/images/background.mp4'), (player) => {
    player.loop = true; // Loop the video
    player.muted = true; // Disable video audio
    player.play(); // Autoplay the video
  });

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.eventBox}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Full-Screen Video Background */}
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
        />
      </View>
      {/* Overlay Content */}
      <View style={styles.overlay}>
      <FlatList
        data={EVENTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={'one-column'} // Force re-render with a unique key
        numColumns={1} // Single column layout
        contentContainerStyle={{
          ...styles.centerContent,
          paddingBottom: 100, // Adjust this value to match the height of the navigation bar
        }}
        showsVerticalScrollIndicator={false} // Hide the vertical scroll bar
      />


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '390%',
    height: '100%',
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' },
    ],
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 55, // Adjust if needed
  },
  
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventBox: {
    width: 300, // Preset width for the box
    height: 220, // Preset height for the box
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },  
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#555',
  },
});
