import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../utils/styling/Colors';
import CardStyles from '../../utils/styling/Cards';


const keyExtractor = ({ id }) => id;


const TransactionHistoryCard = ({ transactions }) => {


  function renderTransactionItem({ item }) {
    return (
      <Text>{item.amount}</Text>
    );
  }

  return (
    <View style={CardStyles.sectionCard}>
      <Text>Transaction History</Text>

      <FlatList
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={renderTransactionItem}
      />

    </View>
  );
};


const styles = StyleSheet.create({

});


TransactionHistoryCard.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TransactionHistoryCard.defaultProps = {};


export default TransactionHistoryCard;
