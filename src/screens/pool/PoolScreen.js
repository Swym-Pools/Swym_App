import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';

const PoolScreen = () => {
  return (
    <View>
      <Text>Estimated Prize: 21 BTC</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

PoolScreen.propTypes = {};

PoolScreen.defaultProps = {};

PoolScreen.navigationOptions = () => {
  return {
    header: () => {
      return <Navbar title="Pool" />;
    },
  };
};

export default PoolScreen;
