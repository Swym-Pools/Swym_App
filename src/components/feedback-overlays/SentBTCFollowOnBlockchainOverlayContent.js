import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import Colors from '../../utils/styling/Colors';
import HeadingStyles from '../../utils/styling/Headings';

const SentBTCFollowOnBlockchainOverlayContent = ({ amountSent, onFollowSelected, onClose }) => {
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
          <Text style={styles.amountText} numberOfLines={1}>
            {amountSent}
          </Text>
          <Text style={[HeadingStyles.largeHeadlineLabel, styles.amountLabel]}>SATS</Text>
        </View>

        <View>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>SENT!</Text>
        </View>

        <Button
          title="Follow on Blockchain"
          buttonStyle={[
            FeedbackOverlayStyles.confirmationButtonContent,
            styles.confirmationButtonContent,
          ]}
          titleStyle={[FeedbackOverlayStyles.confirmationButtonText, styles.confirmationButtonText]}
          onPress={onFollowSelected}
        />
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

  amountText: {
    fontSize: 40,
    fontWeight: '200',
    marginBottom: 2,
  },

  amountLabel: {
    fontWeight: '600',
  },

  messageText: {
    color: Colors.white,
    marginBottom: 36,
  },

  confirmationButtonContent: {
    backgroundColor: Colors.purple,
  },
});

SentBTCFollowOnBlockchainOverlayContent.propTypes = {
  amountSent: PropTypes.number.isRequired,
  onFollowSelected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

SentBTCFollowOnBlockchainOverlayContent.defaultProps = {};

export default SentBTCFollowOnBlockchainOverlayContent;
