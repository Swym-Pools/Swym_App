import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <RootNavigation isSignedIn={isSignedIn} />
    </NavigationContainer>
  );
}
