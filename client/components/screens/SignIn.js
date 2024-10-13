import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import React, { useState } from 'react';

export default function SignIn({ onLogIn, storeUid, navigation, uid }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Call onLogIn without any conditions
  function confirmUser() {
    storeUid('12345');  // Example UID (replace this with your actual login logic)
    onLogIn();          // Directly call the onLogIn function
    navigation.navigate('Home');  // Navigate to 'Home' screen
  }

  return (
    <ImageBackground
      source={require('/Users/christophervidal/Desktop/alzh/wowProject/assets/world-environment-day-concept-abstract-600nw-429357529.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.whiteText}>MiRTH</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={confirmUser}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Sign Up button that navigates to SignUpScreen */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '80%',
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4e85e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpText: {
    color: '#4e85e6',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});
