import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import TransactionShape, { TransactionKind } from '../../data/model-shapes/Transaction';
import { ListItem, Icon } from 'react-native-elements';
import Colors from '../../utils/styling/Colors';

const TransactionListItem = ({ transaction }) => {
  const iconName = useMemo(() => {
    return `ios-arrow-${transaction.kind === TransactionKind.SEND ? 'down' : 'up'}`;
  }, [transaction.kind]);

  return (
    <View style={styles.rootContainer}>
      <ListItem key={transaction.id}>
        <ListItem.Content>
          <ListItem.Title style={styles.leftTitleText}>{transaction.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Title style={styles.rightTitleText}>{transaction.kind}</ListItem.Title>
        <Icon name={iconName} type="ionicon" color={Colors.purple} />
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  leftTitleText: {
    color: Colors.purple,
    fontSize: 20,
    //fontWeight: '300',
    fontFamily: 'Lato-Light',
  },

  rightTitleText: {
    color: Colors.purple,
    fontSize: 20,
    //fontWeight: '500',
    fontFamily: 'Lato-Light',
  },
});

TransactionListItem.propTypes = {
  transaction: TransactionShape.isRequired,
};

TransactionListItem.defaultProps = {};

export default TransactionListItem;
