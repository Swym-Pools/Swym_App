import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WalletScreen from '../screens/wallet/WalletScreen';
import PoolScreen from '../screens/pool/PoolScreen';
import AccountScreen from '../screens/account/AccountScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';

const WalletNavigationStack = createStackNavigator();

const WalletScreenNavigation = () => {
  return (
    <WalletNavigationStack.Navigator name="WalletNavigationRoot">
      <WalletNavigationStack.Screen name="Wallet" component={WalletScreen} />
    </WalletNavigationStack.Navigator>
  );
};

const PoolNavigationStack = createStackNavigator();

const PoolScreenNavigation = () => {
  return (
    <PoolNavigationStack.Navigator name="PoolNavigationRoot">
      <PoolNavigationStack.Screen name="Pool" component={PoolScreen} />
    </PoolNavigationStack.Navigator>
  );
};

const AccountNavigationStack = createStackNavigator();

const AccountScreenNavigation = () => {
  return (
    <AccountNavigationStack.Navigator
      name="AccountNavigationRoot"
      initialRouteName="Account"
      mode="modal"
    >
      <AccountNavigationStack.Screen name="Account" component={AccountScreen} />
      <AccountNavigationStack.Screen name="AccountEdit" component={AccountEditScreen} />
    </AccountNavigationStack.Navigator>
  );
};

const MainNavigationStack = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <MainNavigationStack.Navigator initialRouteName="Wallet">
      <MainNavigationStack.Screen
        name="Wallet"
        component={WalletScreenNavigation}
        options={{ headerShown: false }}
      />
      <MainNavigationStack.Screen
        name="Pool"
        component={PoolScreenNavigation}
        options={{ headerShown: false }}
      />
      <MainNavigationStack.Screen
        name="Account"
        key="UserAccountScreen"
        component={AccountScreenNavigation}
        options={{ headerShown: false }}
      />
    </MainNavigationStack.Navigator>
  );
};

export default MainNavigation;
