import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../utils/styling/Colors';
import { Image, Button } from 'react-native-elements';

const Navbar = ({ title, logout }) => {
  return (
    <View style={styles.rootContainer}>
      <Image
        containerStyle={styles.logoContainer}
        source={require('../../assets/images/logo-orange.png')}
        style={styles.logo}
      />

      <Text style={styles.titleText}>{title}</Text>

      <Button
        containerStyle={styles.logoutButtonContainer}
        type="clear"
        title="Log Out"
        buttonStyle={styles.logoutButton}
        titleStyle={styles.logoutButtonText}
        onPress={async () => {
          logout();
        }}
      />
    </View>
  );
};

const topContentPadding = 8;
const statusBarHeight = 24;
const absoluteTopOffset = topContentPadding + statusBarHeight;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: topContentPadding * 2,
    width: '100%',
  },

  logoContainer: {
    left: 12,
    position: 'absolute',
    top: absoluteTopOffset,
  },

  logo: {
    height: 40,
    width: 40,
  },

  titleText: {
    alignSelf: 'center',
    color: Colors.purple,
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: absoluteTopOffset / 2,
  },

  logoutButtonContainer: {
    position: 'absolute',
    right: 12,
    top: absoluteTopOffset,
  },

  logoutButton: {},

  logoutButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  logout: PropTypes.func,
};

Navbar.defaultProps = {};

export default Navbar;
