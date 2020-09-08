import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';


const AuthNavigationStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthNavigationStack.Navigator name="AuthNavigationRoot">
      <AuthNavigationStack.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <AuthNavigationStack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
    </AuthNavigationStack.Navigator>
  );
}

export default AuthNavigation;
