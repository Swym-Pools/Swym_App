import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import TransactionShape from '../../data/model-shapes/Transaction';
import TransactionListItem from '../../components/wallets/TransactionListItem';
import CardStyles from '../../utils/styling/Cards';
import Colors from '../../utils/styling/Colors';

const keyExtractor = ({ id }) => id;

function renderTransactionItem({ item: transaction }) {
  return <TransactionListItem transaction={transaction} />;
}

const TransactionHistorySection = ({ transactions, isFetching }) => {
  return (
    <View style={CardStyles.sectionCard}>
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text style={styles.sectionHeading}>Transaction History</Text>
          {transactions.length ? (
            <FlatList
              data={transactions}
              keyExtractor={keyExtractor}
              renderItem={renderTransactionItem}
            />
          ) : (
            <Text style={styles.growContainer}>No Transactions</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeading: {
    color: Colors.purple,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  growContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});

TransactionHistorySection.propTypes = {
  transactions: PropTypes.arrayOf(TransactionShape).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

TransactionHistorySection.defaultProps = {};

export default TransactionHistorySection;
