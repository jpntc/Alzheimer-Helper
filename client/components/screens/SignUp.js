import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native';

export default function SignUp({ navigation, onSignUp, uid, storeUid }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the signup process
  const handleSignUp = () => {
    // Logic for signing up (e.g., validation, API calls, etc.)
    storeUid('67890'); // Replace with real UID logic if necessary
    onSignUp(); // Call the onSignUp function to authenticate
    navigation.navigate('Dashboard'); // Navigate to Dashboard after successful signup
  };

  return (
    <ImageBackground
      source={require('/Users/christophervidal/Desktop/alzh/wowProject/assets/world-environment-day-concept-abstract-600nw-429357529.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.firstWord}>Sign Up</Text>

        <TextInput
          style={styles.input1}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input1}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Call handleSignUp on press */}
        <Button title="Submit" onPress={handleSignUp} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  input1: {
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
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstWord: {
    color: '#4e85e6',
    position: 'absolute',
    top: -40,
    fontSize: 20,
  },
});
