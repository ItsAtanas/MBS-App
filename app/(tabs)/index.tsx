import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [positionX] = useState(new Animated.Value(0)); // For horizontal movement
  const [positionY] = useState(new Animated.Value(0)); // For vertical movement

  const player = useVideoPlayer(require('../../assets/images/background.mp4'), (player) => {
    player.loop = true; 
    player.muted = true; 
    player.play(); 
  });

  useEffect(() => {
    // Subscribe to accelerometer updates
    const subscription = Accelerometer.addListener((data) => {
      const newValueX = data.x * 60; // Adjust multiplier for horizontal sensitivity
      const newValueY = -data.y * 60; // Adjust multiplier for vertical sensitivity (invert y for natural tilt)

      // Animate horizontal movement
      Animated.timing(positionX, {
        toValue: newValueX,
        duration: 100,
        useNativeDriver: true,
      }).start();

      // Animate vertical movement
      Animated.timing(positionY, {
        toValue: newValueY,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    // Clean up subscription on unmount
    return () => subscription.remove();
  }, [positionX, positionY]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); 
  }, []);

  return (
    <View style={styles.container}>
      {/* Title at the top 
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Managed Business Solutions</Text>
      </View>
      */}

      {/* Full-Screen Video Background */}
      <View style={styles.videoContainer}>
        <VideoView style={styles.video} player={player} />
      </View>

      {/* Centered Image with Movement */}
      <View style={styles.overlay}>
        <Animated.Image
          source={require('../../assets/images/logo2.png')}
          style={[
            styles.logo,
            {
              transform: [
                { translateX: positionX }, // Apply horizontal translation
                { translateY: positionY }, // Apply vertical translation
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 50, // Adjust vertical position
    width: '100%',
    alignItems: 'center',
    zIndex: 1, // Ensure it appears above other components
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    paddingTop: 50,
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
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',    // Centers horizontally
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    paddingBottom: '30%',
  },
});
