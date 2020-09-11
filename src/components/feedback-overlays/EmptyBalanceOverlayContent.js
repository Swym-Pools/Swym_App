import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';

const EmptyBalanceOverlayContent = ({ onClose }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContentContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            You currently have no BTC saved with Swym.
          </Text>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            We recommend buying BTC on Cash App.
          </Text>
        </View>

        <Button title="Got It" type="clear" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexBasis: '70%',
    maxWidth: 500,
    minWidth: '80%',
  },

  mainContentContainer: {
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  mainTextContainer: {
    marginBottom: 24,
    width: '80%',
    alignItems: 'center',
  },

  messageText: {
    marginBottom: 36,
    textAlign: 'center',
  },
});

EmptyBalanceOverlayContent.propTypes = {
  onClose: PropTypes.func,
};

EmptyBalanceOverlayContent.defaultProps = {
  onClose: () => {},
};

export default EmptyBalanceOverlayContent;
