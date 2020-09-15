import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const SignUpRootScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>SignUpRootScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {},
});

SignUpRootScreen.propTypes = {};

SignUpRootScreen.defaultProps = {};

export default SignUpRootScreen;
