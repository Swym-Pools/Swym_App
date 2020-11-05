import React, { useEffect } from 'react';
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

const WalletScreenNavigation = ({ navigation, logout }) => {
  useEffect(() => {
    navigation.setParams({ logout: () => logout() });
  }, [navigation, logout]);

  return (
    <WalletNavigationStack.Navigator
      initialRouteName="Wallet"
      screenOptions={WalletScreen.navigationOptions}
    >
      <WalletNavigationStack.Screen
        name="Wallet"
        initialParams={{ logout }}
        // component={WalletScreen}
        // options={WalletScreen.navigationOptions}
      >
        {(props) => <WalletScreen {...props} logout={logout} />}
      </WalletNavigationStack.Screen>
    </WalletNavigationStack.Navigator>
  );
};

WalletScreenNavigation.propTypes = {
  logout: PropTypes.func,
};

const PoolNavigationStack = createStackNavigator();

const PoolScreenNavigation = ({ logout }) => {
  return (
    <PoolNavigationStack.Navigator
      initialRouteName="Pool"
      screenOptions={PoolScreen.navigationOptions}
      initialParams={{ logout }}
    >
      <PoolNavigationStack.Screen name="Pool" component={PoolScreen}>
        {(props) => <PoolScreen {...props} logout={logout} />}
      </PoolNavigationStack.Screen>
    </PoolNavigationStack.Navigator>
  );
};

PoolScreenNavigation.propTypes = {
  logout: PropTypes.func,
};

const AccountNavigationStack = createStackNavigator();

const AccountScreenNavigation = ({ navigation, logout }) => {
  useEffect(() => {
    navigation.setParams({ logout: () => logout() });
  }, [navigation, logout]);

  return (
    <AccountNavigationStack.Navigator
      initialRouteName="Account"
      screenOptions={AccountScreen.navigationOptions}
      mode="modal"
    >
      <AccountNavigationStack.Screen
        name="Account"
        initialParams={{ logout }}
        // component={AccountScreen}
      >
        {(props) => <AccountScreen {...props} logout={logout} />}
      </AccountNavigationStack.Screen>
      <AccountNavigationStack.Screen
        name="AccountEdit"
        // component={AccountEditScreen}
      >
        {(props) => <AccountEditScreen {...props} logout={logout} />}
      </AccountNavigationStack.Screen>
    </AccountNavigationStack.Navigator>
  );
};

AccountScreenNavigation.propTypes = {
  logout: PropTypes.func,
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

const MainNavigation = ({ logout }) => {
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
        // component={WalletScreenNavigation}
        options={{ headerShown: false }}
      >
        {(props) => <WalletScreenNavigation {...props} logout={logout} />}
      </MainNavigationStack.Screen>
      <MainNavigationStack.Screen
        name="Pool"
        // component={PoolScreenNavigation}
        options={{ headerShown: false }}
      >
        {(props) => <PoolScreenNavigation {...props} logout={logout} />}
      </MainNavigationStack.Screen>
      <MainNavigationStack.Screen
        name="Account"
        key="UserAccountScreen"
        // component={AccountScreenNavigation}
        options={{ headerShown: false }}
      >
        {(props) => <AccountScreenNavigation {...props} logout={logout} />}
      </MainNavigationStack.Screen>
    </MainNavigationStack.Navigator>
  );
};

MainNavigation.propTypes = {
  logout: PropTypes.func,
};

export default MainNavigation;
