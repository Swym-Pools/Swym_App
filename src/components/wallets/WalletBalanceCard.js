import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import Colors from '../../utils/styling/Colors';
import CardStyles from '../../utils/styling/Cards';
import HeadingStyles from '../../utils/styling/Headings';

const WalletBalanceCard = ({ balance, onDepositSelected, onSendSelected }) => {
  return (
    <View style={CardStyles.sectionCard}>
      <View style={styles.balanceHeader}>
        <Text style={[HeadingStyles.largeHeadline, styles.balanceHeading]}>{balance}</Text>
        <Text style={[HeadingStyles.largeHeadlineLabel, styles.balanceSubheading]}>sats</Text>
      </View>

      <View style={styles.actionButtonsRow}>
        <Button
          containerStyle={[
            ButtonStyles.actionButtonContainer,
            styles.nonTrailingActionButtonContainer,
          ]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          title="deposit"
          onPress={onDepositSelected}
          raised
        />
        <Button
          buttonStyle={ButtonStyles.actionButton}
          titleStyle={ButtonStyles.actionButtonTitle}
          title="send"
          onPress={onSendSelected}
          raised
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceHeader: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginBottom: 24,
  },

  balanceHeading: {
    color: Colors.orange,
    marginBottom: 4,
  },

  balanceSubheading: {
    color: Colors.orange,
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  nonTrailingActionButtonContainer: {
    marginRight: 12,
  },
});

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
