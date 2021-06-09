import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import WalletScreen from '../screens/wallet/WalletScreen';
import PoolScreen from '../screens/pool/PoolScreen';
import AccountScreen from '../screens/account/AccountScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
import Colors from '../utils/styling/Colors';
import TabBar from './TabBar'

const WalletNavigationStack = createStackNavigator();

const WalletScreenNavigation = ({ route }) => {
  const { logout, userId } = route.params;
  return (
    <WalletNavigationStack.Navigator
      initialRouteName="Wallet"
      screenOptions={WalletScreen.navigationOptions}
    >
      <WalletNavigationStack.Screen
        name="Savings"
        component={WalletScreen}
        options={WalletScreen.navigationOptions}
        initialParams={{ logout: () => logout(), userId }}
      />
    </WalletNavigationStack.Navigator>
  );
};

WalletScreenNavigation.propTypes = {
  route: PropTypes.object,
};

const PoolNavigationStack = createStackNavigator();

const PoolScreenNavigation = ({ route }) => {
  const { logout, userId } = route.params;
  return (
    <PoolNavigationStack.Navigator
      initialRouteName="Pool"
      screenOptions={PoolScreen.navigationOptions}
    >
      <PoolNavigationStack.Screen
        name="Pool"
        component={PoolScreen}
        screenOptions={PoolScreen.navigationOptions}
        initialParams={{ logout: () => logout(), userId }}
      />
    </PoolNavigationStack.Navigator>
  );
};
 //debuggin now 
 //give me a sec boiiiiii
PoolScreenNavigation.propTypes = {
  route: PropTypes.object,
};

const AccountNavigationStack = createStackNavigator();

const AccountScreenNavigation = ({ route }) => {
  const { logout, userId } = route.params;
  return (
    <AccountNavigationStack.Navigator
      initialRouteName="Account"
      screenOptions={AccountScreen.navigationOptions}
      mode="modal"
    >
      <AccountNavigationStack.Screen
        name="Account"
        component={AccountScreen}
        initialParams={{ logout: () => logout(), userId }}
      />
      <AccountNavigationStack.Screen
        name="AccountEdit"
        component={AccountEditScreen}
        initialParams={{ logout: () => logout(), userId }}
      />
    </AccountNavigationStack.Navigator>
  );
};

AccountScreenNavigation.propTypes = {
  route: PropTypes.object,
};


const MainNavigationStack = createBottomTabNavigator();

const MainNavigation = ({ userId, logout }) => {
  return (
    <MainNavigationStack.Navigator
      initialRouteName="Savings"
      tabBar={TabBar}

    >
      <MainNavigationStack.Screen
        name="Savings"
        component={WalletScreenNavigation}
        options={{ headerShown: false }}
        initialParams={{ logout: () => logout(), userId }}
      />
      <MainNavigationStack.Screen
        name="Pool"
        component={PoolScreenNavigation}
        options={{ headerShown: false }}
        initialParams={{ logout: () => logout(), userId }}
      />
      <MainNavigationStack.Screen
        name="Account"
        key="UserAccountScreen"
        component={AccountScreenNavigation}
        options={{ headerShown: false }}
        initialParams={{ logout: () => logout(), userId }}
      />
    </MainNavigationStack.Navigator>
  );
};

MainNavigation.propTypes = {
  logout: PropTypes.func,
  userId: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

export default MainNavigation;
