import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { logoutUser } from './src/utils/networking/API';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const logout = async () => {
    const response = await logoutUser();

    if (response.status === 200) {
      setIsSignedIn(false);
    }
  };

  return (
    <NavigationContainer>
      <RootNavigation isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} logout={logout} />
    </NavigationContainer>
  );
}
