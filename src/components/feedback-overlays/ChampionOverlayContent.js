import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import Colors from '../../utils/styling/Colors';

const ChampionOverlayContent = ({ onClose }) => {
  return (
    <View style={[FeedbackOverlayStyles.rootContainer, styles.rootContainer]}>
      <View style={FeedbackOverlayStyles.mainContentContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            You currently have no BTC saved with Swym.
          </Text>
          <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]}>
            We recommend buying BTC on Cash App.
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
});

ChampionOverlayContent.propTypes = {
  onClose: PropTypes.func,
};

ChampionOverlayContent.defaultProps = {
  onClose: () => {},
};

export default ChampionOverlayContent;
