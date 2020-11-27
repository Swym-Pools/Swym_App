import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CardStyles from '../../utils/styling/Cards';
import HeadingStyles from '../../utils/styling/Headings';
import ButtonStyles from '../../utils/styling/Buttons';
import { Button } from 'react-native-elements';
import Colors from '../../utils/styling/Colors';

const WalletDetailsSection = ({ balance, isFetching, onDepositSelected, onSendSelected }) => {
  return (
    <View style={CardStyles.sectionCard}>
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.mainContentContainer}>
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
              title="Save"
              onPress={onDepositSelected}
              raised
            />
            <Button
              buttonStyle={ButtonStyles.actionButton}
              titleStyle={ButtonStyles.actionButtonTitle}
              title="Send"
              onPress={onSendSelected}
              raised
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    alignItems: 'center',
  },

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

WalletDetailsSection.propTypes = {
  balance: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onDepositSelected: PropTypes.func,
  onSendSelected: PropTypes.func,
};

WalletDetailsSection.defaultProps = {
  onDepositSelected: () => {},
  onSendSelected: () => {},
};

export default WalletDetailsSection;
