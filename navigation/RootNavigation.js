import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';


const RootNavigation = ({
  isSignedIn,
}) => {
  if (isSignedIn) {
    return <MainNavigation />
  } else {
    return <AuthNavigation />
  }
};


const styles = StyleSheet.create({

});


RootNavigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

RootNavigation.defaultProps = {

};


export default RootNavigation;
