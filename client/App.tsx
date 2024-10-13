import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/screens/SignIn';  // Ensure correct path
import SignUp from './components/screens/SignUp';  // Ensure correct path
import Home from './components/Home';              // Ensure correct path
import DashboardScreen from './components/DashboardScreen';  // Ensure correct path

const Stack = createStackNavigator();

export default function App() {
  // State to track if the user is authenticated and to store the user ID
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState("");

  // Function to store the user ID and authenticate
  function storeUid(id = "") {
    setUid(id);
    setIsAuthenticated(true);  // Mark the user as authenticated
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {props => (
                <SignIn 
                  {...props} 
                  onLogIn={() => setIsAuthenticated(true)} 
                  storeUid={storeUid} 
                  uid={uid} 
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {props => (
                <SignUp
                  {...props} 
                  onSignUp={() => setIsAuthenticated(true)} 
                  storeUid={storeUid} 
                  uid={uid} 
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            {/* After authentication, load the Dashboard and Home screens */}
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

