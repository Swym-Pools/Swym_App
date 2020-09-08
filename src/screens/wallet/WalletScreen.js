import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import { fetchTransactionHistory, fetchUserAccount } from '../../utils/networking/API';
import WalletBalanceCard from '../../components/wallets/WalletBalanceCard';
import TransactionHistoryCard from '../../components/wallets/TransactionHistoryCard';
import { sortTransactionsByDate } from '../../utils/transactions/TransactionUtils';
import Colors from '../../utils/styling/Colors';

export const SectionKind = Object.freeze({
  WALLET_BALANCE: 'WALLET_BALANCE',
  TRANSACTION_HISTORY: 'TRANSACTION_HISTORY',
});

function sectionListItemKeyExtractor(item, index) {
  return index;
}

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
      <SectionList
        contentContainerStyle={styles.contentContainer}
        sections={[
          {
            kind: SectionKind.WALLET_BALANCE,
            data: [accountBalance],
            renderItem: () => <WalletDetailsSection />,
          },
          {
            kind: SectionKind.TRANSACTION_HISTORY,
            data: [transactionHistory],
            renderItem: () => <TransactionHistorySection />,
          },
        ]}
        keyExtractor={sectionListItemKeyExtractor}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootViewContainer: {
    backgroundColor: Colors.blue,
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  cardContainer: {
    marginBottom: 20,
    maxWidth: '100%',
    minWidth: '100%',
  },
});

WalletScreen.propTypes = {};

WalletScreen.defaultProps = {};

export default WalletScreen;
