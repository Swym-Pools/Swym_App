import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { logoutUser } from './src/utils/networking/API';
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

const getFonts = () => Font.loadAsync({
  'LuckiestGuy-Regular': require('./assets/fonts/LuckiestGuy-Regular.ttf'),  
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
  'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
  
//Italics, uncomment when used

//'Krub-BoldItalic': require('./assets/fonts/Krub-BoldItalic.ttf'),
//'Krub-SemiBoldItalic': require('./assets/fonts/Krub-SemiBoldItalic.ttf'),
//'Krub-MediumItalic': require('./assets/fonts/Krub-MediumItalic.ttf'),
//'Krub-RegularItalic': require('./assets/fonts/Krub-Italic.ttf'),
//'Krub-LightItalic': require('./assets/fonts/Krub-Light.ttf'),
//'Krub-ExtraLightItalic': require('./assets/fonts/Krub-ExtraLight.ttf'),
  
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

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
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
    onError={(e)=> console.log(e)}
  />
  )
}

}
