import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button, Image } from 'react-native-elements';
import Colors from '../utils/styling/Colors';
import FeedbackOverlayStyles from '../utils/styling/FeedbackOverlays';

const ChampionAnnouncementModal = ({ modalVisible, onClose, winner }) => {
  console.log('colors', Colors.purple);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            title="X"
            type="clear"
            containerStyle={styles.closeButtonContainer}
            titleStyle={styles.closeButtonContent}
            onPress={onClose}
          />
          <Image
            containerStyle={styles.imageContainer}
            source={require('../../assets/images/splash.png')}
            style={styles.image}
          />
          <Text style={styles.headerText}>You won!</Text>
          <Text style={styles.messageText}>+10.50 BTC</Text>
          <Text style={styles.subMessageText}>
            {winner
              ? 'just got deposited to your Swym account'
              : 'Keep saving with Swym to win the next prize!'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: Colors.whiteBackgroundOpacity,
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.blue,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 5,
    margin: 20,
    padding: 35,
    position: 'relative',
    width: 350,
  },
  imageContainer: {
    position: 'absolute',
    top: 100,
  },
  image: {
    height: 60,
    width: 350,
  },
  headerText: {
    color: Colors.purple,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  messageText: {
    color: Colors.orange,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: Colors.orange,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  subMessageText: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '75%',
  },
  closeButtonContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    right: 20,
    top: 15,
  },
  closeButtonContent: {
    backgroundColor: Colors.white,
    color: Colors.grayScale3,
    fontSize: 20,
  },
});

ChampionAnnouncementModal.propTypes = {
  onClose: PropTypes.func,
  modalVisible: PropTypes.bool,
  winner: PropTypes.object,
};

ChampionAnnouncementModal.defaultProps = {};

export default ChampionAnnouncementModal;
