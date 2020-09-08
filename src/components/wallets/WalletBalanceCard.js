import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

const WalletBalanceCard = ({ balance, onDepositSelected, onSendSelected }) => {
  return (
    <View>
      <Text>Balance: {balance} Sats</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

WalletBalanceCard.propTypes = {
  balance: PropTypes.number.isRequired,
  onDepositSelected: PropTypes.func,
  onSendSelected: PropTypes.func,
};

WalletBalanceCard.defaultProps = {
  onDepositSelected: () => {},
  onSendSelected: () => {},
};

export default WalletBalanceCard;
