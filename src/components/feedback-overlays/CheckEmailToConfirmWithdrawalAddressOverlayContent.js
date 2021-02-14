import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styling/Colors';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import { Button } from 'react-native-elements';

const CheckEmailToConfirmWithdrawalAddressOverlayContent = ({ onClose }) => {
  return (
    <View style={[FeedbackOverlayStyles.rootContainer, styles.rootContainer]}>
      <View style={FeedbackOverlayStyles.mainContentContainer}>
        <Button
          title="X"
          buttonStyle={FeedbackOverlayStyles.closeButtonContent}
          containerStyle={FeedbackOverlayStyles.closeButtonContainer}
          onPress={onClose}
        />

        <View style={styles.mainTextContainer}>
          {/* <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            Check your email to confirm send or withdrawal address.
  </Text>*/}
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            You can only send to the withdrawal address saved on your profile.
          </Text>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText, styles.purpleText]}>
            Please navigate to the accounts page to save your withdrawal address and confirm it via email.
          </Text>
        </View>

        {/* <Button
          title="Got It"
          buttonStyle={[
            FeedbackOverlayStyles.confirmationButtonContent,
            styles.confirmationButtonContent,
          ]}
          titleStyle={[FeedbackOverlayStyles.confirmationButtonText, styles.confirmationButtonText]}
          onPress={onClose}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.blue,
  },

  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '80%',
  },

  messageText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 36,
    textAlign: 'center',
  },

  purpleText: {
    color: Colors.purple,
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
