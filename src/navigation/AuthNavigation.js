import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpRootScreen from '../screens/auth/sign-up/SignUpRootScreen';
import SignUpFormScreen from '../screens/auth/sign-up/SignUpFormScreen';

const SignUpNavigationStack = createStackNavigator();

const SignUpNavigation = ({ route }) => {
  const { setIsSignedIn, setUserId } = route.params;

  return (
    <SignUpNavigationStack.Navigator initialRouteName="Sign-Up Root" mode="modal">
      <SignUpNavigationStack.Screen
        name="Sign-Up Root"
        component={SignUpRootScreen}
        options={{ headerShown: false }}
      />
      <SignUpNavigationStack.Screen
        name="Sign-Up Form"
        component={SignUpFormScreen}
        options={SignUpFormScreen.navigationOptions}
        initialParams={{ setIsSignedIn, setUserId }}
      />
    </SignUpNavigationStack.Navigator>
  );
};

SignUpNavigation.propTypes = {
  route: PropTypes.object,
};

const AuthNavigationStack = createStackNavigator();

const AuthNavigation = ({ setIsSignedIn, setUserId }) => {
  return (
    <AuthNavigationStack.Navigator initialRouteName="Sign-In">
      <AuthNavigationStack.Screen
        name="Sign-In"
        component={SignInScreen}
        options={SignInScreen.navigationOptions}
        initialParams={{ setIsSignedIn, setUserId }}
      />
      <AuthNavigationStack.Screen
        name="Sign-Up"
        component={SignUpNavigation}
        options={{ headerShown: false }}
        initialParams={{ setIsSignedIn, setUserId }}
      />
    </AuthNavigationStack.Navigator>
  );
};

AuthNavigation.propTypes = {
  setIsSignedIn: PropTypes.func,
  setUserId: PropTypes.func,
};

export default AuthNavigation;
