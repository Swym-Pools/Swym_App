import React from 'react';
import PropTypes from 'prop-types';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = ({ isSignedIn, setIsSignedIn, userId, setUserId, logout }) => {
  if (isSignedIn) {
    return <MainNavigation userId={userId} logout={logout} />;
  } else {
    return <AuthNavigation setUserId={setUserId} setIsSignedIn={setIsSignedIn} />;
  }
};

RootNavigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  setIsSignedIn: PropTypes.func,
  setUserId: PropTypes.func,
  userId: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  logout: PropTypes.func,
};

RootNavigation.defaultProps = {};

export default RootNavigation;
