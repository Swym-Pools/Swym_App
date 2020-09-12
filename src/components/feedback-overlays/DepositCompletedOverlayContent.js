import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import Colors from '../../utils/styling/Colors';

const DepositCompletedOverlayContent = ({ onClose }) => {
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
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            If you deposited Bitcoin, check back soon once the transaction has cleared.
          </Text>

          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            This can take up to 24 hours.
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
  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '80%',
  },

  messageText: {
    color: Colors.purple,
    marginBottom: 36,
  },

  confirmationButtonContent: {
    backgroundColor: Colors.blue,
  },
});

DepositCompletedOverlayContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

DepositCompletedOverlayContent.defaultProps = {};

export default DepositCompletedOverlayContent;
