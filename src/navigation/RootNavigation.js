import React from 'react';
import PropTypes from 'prop-types';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = ({ isSignedIn, setIsSignedIn, logout }) => {
  if (isSignedIn) {
    return <MainNavigation setIsSignedIn={setIsSignedIn} logout={logout} />;
  } else {
    return <AuthNavigation setIsSignedIn={setIsSignedIn} />;
  }
};

RootNavigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  setIsSignedIn: PropTypes.func,
  logout: PropTypes.func,
};

RootNavigation.defaultProps = {};

export default RootNavigation;
