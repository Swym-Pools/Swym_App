import React from 'react';
import PropTypes from 'prop-types';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = ({ isSignedIn }) => {
  if (isSignedIn) {
    return <MainNavigation />;
  } else {
    return <AuthNavigation />;
  }
};

RootNavigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

RootNavigation.defaultProps = {};

export default RootNavigation;
