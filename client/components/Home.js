import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Import icons
import Family from './Family';
import Game from './Game';
import Summary from './Summary';
import EmergencyContacts from './EmergencyContacts';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState(null);  // To track which component to render

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Game':
        return <Game onBack={() => setActiveComponent(null)} />;
      case 'Settings':
        return <Summary onBack={() => setActiveComponent(null)} />;  // Replace with Settings if you have it
      case 'Journal':
        return <Summary onBack={() => setActiveComponent(null)} />;  // Replace with Journal if you have it
      case 'Family':
        return <Family onBack={() => setActiveComponent(null)} />;
      case 'EmergencyContacts':
        return <EmergencyContacts onBack={() => setActiveComponent(null)} />;
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App</Text>

            {/* Gaming Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setActiveComponent('Game')}>
              <Icon name="gamepad-variant" size={50} color="#4CAF50" />
              <Text style={styles.iconText}>Game</Text>
            </TouchableOpacity>

            {/* Settings Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setActiveComponent('Settings')}>
              <Icon name="cog-outline" size={50} color="#4CAF50" />
              <Text style={styles.iconText}>Settings</Text>
            </TouchableOpacity>

            {/* Journal Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setActiveComponent('Journal')}>
              <Icon name="book-open-variant" size={50} color="#4CAF50" />
              <Text style={styles.iconText}>Journal</Text>
            </TouchableOpacity>

            {/* Family Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setActiveComponent('Family')}>
              <Icon name="account-group-outline" size={50} color="#4CAF50" />
              <Text style={styles.iconText}>Family</Text>
            </TouchableOpacity>

            {/* Emergency Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setActiveComponent('EmergencyContacts')}>
              <Icon name="alert-circle-outline" size={50} color="#4CAF50" />
              <Text style={styles.iconText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',      // Center horizontally
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,         // Space between title and icons
  },
  iconButton: {
    flexDirection: 'column',  // Arrange icon and text vertically
    alignItems: 'center',     // Center horizontally
    marginBottom: 30,         // Space between each icon
  },
  iconText: {
    fontSize: 16,
    marginTop: 10,            // Space between icon and text
    color: '#4CAF50',
  },
});
