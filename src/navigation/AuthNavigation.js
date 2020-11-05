import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpRootScreen from '../screens/auth/sign-up/SignUpRootScreen';
import SignUpFormScreen from '../screens/auth/sign-up/SignUpFormScreen';

const SignUpNavigationStack = createStackNavigator();

const SignUpNavigation = ({ setIsSignedIn }) => {
  return (
    <SignUpNavigationStack.Navigator initialRouteName="Sign-Up Root" mode="modal">
      <SignUpNavigationStack.Screen
        name="Sign-Up Root"
        // component={SignUpRootScreen}
        options={{ headerShown: false }}
      >
        {(props) => <SignUpRootScreen {...props} setIsSignedIn={setIsSignedIn} />}
      </SignUpNavigationStack.Screen>
      <SignUpNavigationStack.Screen
        name="Sign-Up Form"
        // component={SignUpFormScreen}
        options={SignUpFormScreen.navigationOptions}
      >
        {(props) => <SignUpFormScreen {...props} setIsSignedIn={setIsSignedIn} />}
      </SignUpNavigationStack.Screen>
    </SignUpNavigationStack.Navigator>
  );
};

SignUpNavigation.propTypes = {
  setIsSignedIn: PropTypes.func,
};

const AuthNavigationStack = createStackNavigator();

const AuthNavigation = ({ setIsSignedIn }) => {
  return (
    <AuthNavigationStack.Navigator initialRouteName="Sign-In">
      <AuthNavigationStack.Screen
        name="Sign-In"
        // component={SignInScreen}
        options={SignInScreen.navigationOptions}
      >
        {(props) => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
      </AuthNavigationStack.Screen>
      <AuthNavigationStack.Screen
        name="Sign-Up"
        // component={SignUpNavigation}
        options={{ headerShown: false }}
      >
        {(props) => <SignUpNavigation {...props} setIsSignedIn={setIsSignedIn} />}
      </AuthNavigationStack.Screen>
    </AuthNavigationStack.Navigator>
  );
};

AuthNavigation.propTypes = {
  setIsSignedIn: PropTypes.func,
};

export default AuthNavigation;
