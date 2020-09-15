import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignUpRootScreen from '../screens/auth/sign-up/SignUpRootScreen';
import SignUpFormScreen from '../screens/auth/sign-up/SignUpFormScreen';

const SignUpNavigationStack = createStackNavigator();

const SignUpNavigation = () => {
  return (
    <SignUpNavigationStack.Navigator initialRouteName="Sign-Up Root" mode="modal">
      <SignUpNavigationStack.Screen name="Sign-Up Root" component={SignUpRootScreen} />
      <SignUpNavigationStack.Screen name="Sign-Up Form" component={SignUpFormScreen} />
    </SignUpNavigationStack.Navigator>
  );
};

const AuthNavigationStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthNavigationStack.Navigator initialRouteName="Sign-In">
      <AuthNavigationStack.Screen
        name="Sign-In"
        component={SignInScreen}
        options={SignInScreen.navigationOptions}
      />
      <AuthNavigationStack.Screen name="Sign-Up" component={SignUpNavigation} />
    </AuthNavigationStack.Navigator>
  );
};

export default AuthNavigation;
