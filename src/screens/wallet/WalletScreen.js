import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { fetchTransactionHistory, fetchUserAccount } from '../../utils/networking/API';
import WalletBalanceCard from '../../components/wallets/WalletBalanceCard';
import TransactionHistoryCard from '../../components/wallets/TransactionHistoryCard';
import { sortTransactionsByDate } from '../../utils/transactions/TransactionUtils';

const WalletScreen = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isFetchingTransactionHistory, setIsFetchingTransactionHistory] = useState(false);
  const [hasTransactionHistoryFetchError, setHasTransactionHistoryFetchError] = useState(false);

  const [userAccount, setUserAccount] = useState(null);
  const [isFetchingUserAccount, setIsFetchingUserAccount] = useState(false);
  const [hasUserAccountFetchError, setHasUserAccountFetchError] = useState(false);

  const sortedTransactions = useMemo(() => {
    return sortTransactionsByDate(transactionHistory);
  }, [transactionHistory]);

  const accountBalance = useMemo(() => {
    return userAccount === null ? 0 : userAccount.balance;
  }, [userAccount]);

  useEffect(() => {
    loadAccountDetails();
    loadTransactionHistory();
  }, []);

  async function loadAccountDetails() {
    setIsFetchingUserAccount(true);

    try {
      // TODO: Refactor after there's more clarity about how to retrieve authentication
      // credentials from the API.
      const userAccount = await fetchUserAccount();

      setUserAccount(userAccount);
      setHasUserAccountFetchError(false);
    } catch (error) {
      setHasUserAccountFetchError(true);
    } finally {
      setIsFetchingUserAccount(false);
    }
  }

  async function loadTransactionHistory() {
    setIsFetchingTransactionHistory(true);

    try {
      const transactionHistory = await fetchTransactionHistory();

      setTransactionHistory(transactionHistory);
      setHasTransactionHistoryFetchError(false);
    } catch (error) {
      setHasTransactionHistoryFetchError(true);
    } finally {
      setIsFetchingTransactionHistory(false);
    }
  }

  function performDeposit() {}
  function performWithdrawal() {}

  const WalletDetailsSection = () => {
    if (isFetchingUserAccount) {
      return (
        <View style={styles.cardContainer}>
          <ActivityIndicator size="large" />
          {/* {hasUserAccountFetchError && (
            <Text>TODO: Some Error Message</Text>
          )} */}
        </View>
      );
    } else {
      return (
        <View style={styles.cardContainer}>
          <WalletBalanceCard
            balance={accountBalance}
            onDepositSelected={performDeposit}
            onSendSelected={performWithdrawal}
          />
        </View>
      );
    }
  };

  const TransactionHistorySection = () => {
    if (isFetchingTransactionHistory) {
      return (
        <View style={styles.cardContainer}>
          <ActivityIndicator size="large" />
          {/* {hasTransactionHistoryFetchError && (
            <Text>TODO: Some Error Message</Text>
          )} */}
        </View>
      );
    } else {
      return (
        <View style={styles.cardContainer}>
          <TransactionHistoryCard transactions={sortedTransactions} />
        </View>
      );
    }
  };

  return (
    <View style={styles.rootViewContainer}>
      <WalletDetailsSection />
      <TransactionHistorySection />
    </View>
  );
};

const styles = StyleSheet.create({
  rootViewContainer: {
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  cardContainer: {
    borderRadius: 12,
  },
});

WalletScreen.propTypes = {};

WalletScreen.defaultProps = {};

export default WalletScreen;
