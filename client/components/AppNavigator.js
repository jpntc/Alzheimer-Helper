// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';  // Main screen after login
import GameMatchScreen from './GameMatchScreen';  // Other screens in the app
import DashboardScreen from './DashboardScreen';
import Family from "./Family"
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GameMatch" component={GameMatchScreen} />
      <Stack.Screen name="DashBoard" component={DashboardScreen} />
      <Stack.screen name="Family" component={Family}/>
    </Stack.Navigator>
  );
}
