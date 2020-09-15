import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import Colors from '../utils/styling/Colors';

const SwymNameLogo = ({ style }) => {
  return <Text style={{ ...styles.nameLogoText, ...style }}>Swym</Text>;
};

const styles = StyleSheet.create({
  nameLogoText: {
    color: Colors.white,
    fontSize: 84,
    textShadowColor: Colors.shadow2,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});

SwymNameLogo.propTypes = {
  style: PropTypes.object,
};

SwymNameLogo.defaultProps = {
  style: {},
};

export default SwymNameLogo;
