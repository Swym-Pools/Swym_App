import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WalletScreen from '../screens/wallet/WalletScreen';
import PoolScreen from '../screens/pool/PoolScreen';
import AccountScreen from '../screens/account/AccountScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
import { Ionicons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../utils/styling/Colors';

const WalletNavigationStack = createStackNavigator();

const WalletScreenNavigation = () => {
  return (
    <WalletNavigationStack.Navigator
      initialRouteName="Wallet"
      screenOptions={WalletScreen.navigationOptions}
    >
      <WalletNavigationStack.Screen
        name="Wallet"
        component={WalletScreen}
        // options={WalletScreen.navigationOptions}
      />
    </WalletNavigationStack.Navigator>
  );
};

const PoolNavigationStack = createStackNavigator();

const PoolScreenNavigation = () => {
  return (
    <PoolNavigationStack.Navigator
      initialRouteName="Pool"
      screenOptions={PoolScreen.navigationOptions}
    >
      <PoolNavigationStack.Screen name="Pool" component={PoolScreen} />
    </PoolNavigationStack.Navigator>
  );
};

const AccountNavigationStack = createStackNavigator();

const AccountScreenNavigation = () => {
  return (
    <AccountNavigationStack.Navigator
      initialRouteName="Account"
      screenOptions={AccountScreen.navigationOptions}
      mode="modal"
    >
      <AccountNavigationStack.Screen name="Account" component={AccountScreen} />
      <AccountNavigationStack.Screen name="AccountEdit" component={AccountEditScreen} />
    </AccountNavigationStack.Navigator>
  );
};

function makeTabBarIcon({ name: routeName }, opts) {
  const { color, size } = opts;

  switch (routeName) {
    case 'Wallet':
      return <SimpleLineIcons name="wallet" size={size} color={color} />;
    case 'Pool':
      return <Ionicons name="ios-water" size={size} color={color} />;
    case 'Account':
      return <FontAwesome name="user-circle-o" size={size} color={color} />;
    default:
      break;
  }
}

const MainNavigationStack = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <MainNavigationStack.Navigator
      initialRouteName="Wallet"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            return makeTabBarIcon(route, { focused, color, size });
          },
        };
      }}
      tabBarOptions={{
        activeBackgroundColor: Colors.blue,
        inactiveBackgroundColor: Colors.blue,
        activeTintColor: Colors.purple,
        inactiveTintColor: Colors.iconDisabled,
      }}
    >
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
