import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
    
<TextInput
          style={styles.input1}
          placeholder="Username"
          placeholderTextColor="#ccc"
        />

<TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="#ccc"
        />

<TextInput
          style={styles.input1}
          placeholder="Password"
          placeholderTextColor="#ccc"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 32,
    color: 'white',
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
});
