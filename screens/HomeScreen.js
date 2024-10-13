import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You pressed the text button.');
  };

  return (
    <ImageBackground
      source={require('/Users/christophervidal/Desktop/alzh/wowProject/assets/world-environment-day-concept-abstract-600nw-429357529.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.whiteText}>miht</Text>

        {/* Username input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />

        {/* Submit button */}
        <Button title="Submit" onPress={() => console.log("Submitted")} />

        {/* Sign Up button that navigates to SignInScreen */}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 50,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    position: 'absolute',
    top: -120,
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '60%',
    maxWidth: 400,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  buttonText: {
    color: '#4e85e6',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    bottom: -150,
  },
});
