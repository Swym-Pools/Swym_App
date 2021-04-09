import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { logoutUser } from './src/utils/networking/API';
import { YellowBox } from 'react-native';
import { AppLoading} from 'expo';
import * as Font from 'expo-font'

const getFonts = () => Font.loadAsync({
  'Krub-Regular': require('./assets/fonts/Krub-Regular.ttf'),
  'LuckiestGuy-Regular': require('./assets/fonts/LuckiestGuy-Regular.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const logout = async () => {
    const response = await logoutUser();

    if (response.status === 200) {
      setIsSignedIn(false);
      setUserId(null);
    }
  };

  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  if (fontsLoaded){

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
}  else {

  return (<AppLoading
    startAsync={getFonts}
    onFinish={()=> setFontsLoaded(true)}
  />
  )
}

}
