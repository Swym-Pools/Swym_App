import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import SignInScreen from '../screens/auth/SignInScreen';
import SignIn2FAScreen from '../screens/auth/SignIn2FAScreen';
import SignUpRootScreen from '../screens/auth/sign-up/SignUpRootScreen';
import SignUpFormScreen from '../screens/auth/sign-up/SignUpFormScreen';
import SignUpTOTPScreen from '../screens/auth/sign-up/SignUpTOTPScreen';
import ResetPasswordScreen from '../screens/auth/sign-up/ResetPasswordScreen';

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
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
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
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
      />
      <AuthNavigationStack.Screen
        name="Sign-In-2FA"
        component={SignIn2FAScreen}
        options={SignIn2FAScreen.navigationOptions}
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
      />
      <AuthNavigationStack.Screen
        name="Sign-Up"
        component={SignUpNavigation}
        options={{ headerShown: false }}
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
      />
      <AuthNavigationStack.Screen
        name="Sign-Up-TOTP"
        component={SignUpTOTPScreen}
        options={{ headerShown: false }}
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
      />
      <AuthNavigationStack.Screen
        name="Reset-Password"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
        
        initialParams={{ setIsSignedIn: (bool) => setIsSignedIn(bool), setUserId }}
      />

    </AuthNavigationStack.Navigator>
  );
};

AuthNavigation.propTypes = {
  setIsSignedIn: PropTypes.func,
  setUserId: PropTypes.func,
};

export default AuthNavigation;
