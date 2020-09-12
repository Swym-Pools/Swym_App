import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styling/Colors';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import { Button } from 'react-native-elements';

const CheckEmailToConfirmWithdrawalAddressOverlayContent = ({ onClose }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContentContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            Check your email to confirm send or withdrawal address.
          </Text>
        </View>

        <Button
          title="Got It"
          buttonStyle={[
            FeedbackOverlayStyles.confirmationButtonContent,
            styles.confirmationButtonContent,
          ]}
          titleStyle={[FeedbackOverlayStyles.confirmationButtonText, styles.confirmationButtonText]}
          onPress={onClose}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.blue,
    flexBasis: '70%',
    maxWidth: 500,
    minWidth: '80%',
  },

  mainContentContainer: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '80%',
  },

  messageText: {
    color: Colors.white,
    marginBottom: 36,
    textAlign: 'center',
  },

  confirmationButtonContent: {
    backgroundColor: Colors.deepblue,
  },

  confirmationButtonText: {
    color: Colors.white,
  },
});

CheckEmailToConfirmWithdrawalAddressOverlayContent.propTypes = {
  onClose: PropTypes.func,
};

CheckEmailToConfirmWithdrawalAddressOverlayContent.defaultProps = {
  onClose: () => {},
};

export default CheckEmailToConfirmWithdrawalAddressOverlayContent;
