import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <NavigationContainer>
      <RootNavigation isSignedIn={isSignedIn} />
    </NavigationContainer>
  );
}
