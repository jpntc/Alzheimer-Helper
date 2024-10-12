import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
const API_URL = 'http://3.128.33.217:3000/users'; // Update if your server is hosted elsewhere

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

document.getElementById('fetch-users').addEventListener('click', async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        console.error('Failed to fetch users:', response.statusText);
        return;
    }

    const users = await response.json();
    displayUsers(users);
});

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
        userList.appendChild(userDiv);
    });
}
