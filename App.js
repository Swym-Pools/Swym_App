import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { logoutUser } from './src/utils/networking/API';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const logout = async () => {
    const response = await logoutUser();

    if (response.status === 200) {
      setIsSignedIn(false);
      setUserId(null);
    }
  };

  return (
    <NavigationContainer>
      <RootNavigation
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        userId={userId}
        setUserId={setUserId}
        logout={logout}
      />
    </NavigationContainer>
  );
}
