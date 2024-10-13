import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Family({ onBack }) {
  return (
    <View style={styles.container}>
      {/* Back button in the top-left corner with an arrow image */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Image source={require('/Users/christophervidal/Desktop/alzh/wowProject/client/assets/images.png')} style={styles.backIcon} />
      </TouchableOpacity>
      
      <Text style={styles.title}>Family Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',  // Position the button in the corner
    top: 10,  // Adjust this value to your desired location
    left: 10,  // Adjust this value to your desired location
    padding: 10,  // Add some padding for a clickable area
  },
  backIcon: {
    width: 40,  // Set the size of the arrow image
    height: 40,  // Set the size of the arrow image
    marginLeft: -60,
    position: 'absolute',
    bottom: -40,  // Set the size of the arrow image
  },
});
