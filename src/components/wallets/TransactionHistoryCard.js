import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../../utils/styling/Colors';
import CardStyles from '../../utils/styling/Cards';
import TransactionListItem from './TransactionListItem';
import TransactionShape from '../../data/model-shapes/Transaction';

const keyExtractor = ({ id }) => id;

const TransactionHistoryCard = ({ transactions }) => {
  function renderTransactionItem({ item: transaction }) {
    return <TransactionListItem transaction={transaction} />;
  }

  return (
    <View style={CardStyles.sectionCard}>
      <Text style={styles.sectionHeading}>Transaction History</Text>

      <FlatList
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={renderTransactionItem}
      />
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
});

TransactionHistoryCard.propTypes = {
  transactions: PropTypes.arrayOf(TransactionShape).isRequired,
};

TransactionHistoryCard.defaultProps = {};

export default TransactionHistoryCard;
