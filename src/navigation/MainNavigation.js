import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import WalletScreen from '../screens/wallet/WalletScreen';
import PoolScreen from '../screens/pool/PoolScreen';
import AccountScreen from '../screens/account/AccountScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
import { Ionicons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../utils/styling/Colors';

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

function makeTabBarIcon({ name: routeName }, opts) {
  const { color, size } = opts;

  switch (routeName) {
    case 'Savings':
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

const MainNavigation = ({ userId, logout }) => {
  return (
    <MainNavigationStack.Navigator
      initialRouteName="Savings"
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
        style: { backgroundColor: Colors.blue },
      }}
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
