// screens/GameMatchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function GameMatchScreen() {
  // Predefined images and their associated names
  const imageOptions = [
    { uri: require('/Users/christophervidal/Desktop/alzh/wowProject/client/assets/IMG_0425.jpg'), name: 'Christopher' },  // Replace with your image paths
    { uri: require('/Users/christophervidal/Desktop/alzh/wowProject/client/assets/IMG_0964.jpg'), name: 'Owen' },
    { uri: require('/Users/christophervidal/Desktop/alzh/wowProject/client/assets/IMG_0965.jpg'), name: 'Ling' },
    { uri: require('/Users/christophervidal/Desktop/alzh/wowProject/client/assets/IMG_0966.jpg'), name: 'Jude' },
  ];

  // State to store the correct name to match
  const [correctName, setCorrectName] = useState('');
  // State to store the randomized image order
  const [shuffledImages, setShuffledImages] = useState([]);

  // Shuffle the images and select a random name on component mount
  useEffect(() => {
    shuffleImagesAndSelectName();
  }, []);

  // Shuffle images and set a random correct name
  const shuffleImagesAndSelectName = () => {
    // Shuffle the images array
    const shuffled = [...imageOptions].sort(() => 0.5 - Math.random());
    setShuffledImages(shuffled);

    // Randomly select one of the shuffled images' names as the correct answer
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    setCorrectName(shuffled[randomIndex].name);
  };

  // Function to handle image selection
  const handleImageSelection = (selectedImage) => {
    if (selectedImage.name === correctName) {
      Alert.alert('Correct!', `You selected the right picture of ${correctName}.`);
    } else {
      Alert.alert('Incorrect', `That's not ${correctName}. Try again!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Who is {correctName}?</Text>

      <View style={styles.imageContainer}>
        {shuffledImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageSelection(image)}>
            <Image source={image.uri} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Optional button to shuffle again for replayability */}
      <TouchableOpacity style={styles.shuffleButton} onPress={shuffleImagesAndSelectName}>
        <Text style={styles.shuffleButtonText}>Shuffle and Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  shuffleButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  shuffleButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
