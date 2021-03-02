import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { fetchMostRecentWinner } from '../utils/networking/API';
import Colors from '../utils/styling/Colors';

const ChampionAnnouncementModal = ({ modalVisible, onClose, winner }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mostRecentWinner, setMostRecentWinner] = useState(null);

  useEffect(() => {
    async function loadMostRecentWinner() {
      const response = await fetchMostRecentWinner();
      if (response.status === 200) {
        setMostRecentWinner(response.data);
      }
      setIsLoading(false);
    }

    loadMostRecentWinner();
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        {isLoading ? (
          <View style={styles.modalView}>
            <Image
              containerStyle={styles.logoContainer}
              source={require('../../assets/images/logo-orange.png')}
              style={styles.logo}
            />
            <Text>Loading...</Text>
          </View>
        ) : (
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
            <Text style={winner ? styles.headerText : [styles.headerText, styles.smallerHeader]}>
              {winner ? 'You won!' : 'Better luck next time'}
            </Text>

            <Text style={winner ? styles.messageText : [styles.messageText, styles.smallerMessage]}>
              {winner
                ? `+${mostRecentWinner.amount} sats`
                : `${mostRecentWinner ? mostRecentWinner.user.username : ' '} won +${mostRecentWinner.amount} sats`}
            </Text>
            <Text style={styles.subMessageText}>
              {winner
                ? 'just got deposited to your Swym account'
                : 'Keep saving with Swym to win the next prize!'}
            </Text>
          </View>
        )}
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  smallerHeader: {
    fontSize: 25,
  },
  messageText: {
    color: Colors.orange,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  smallerMessage: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
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
    top: 10,
  },
  closeButtonContent: {
    backgroundColor: Colors.white,
    color: Colors.grayScale3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {},
  logo: {
    height: 40,
    width: 40,
  },
});

ChampionAnnouncementModal.propTypes = {
  onClose: PropTypes.func,
  modalVisible: PropTypes.bool,
  winner: PropTypes.bool,
};

ChampionAnnouncementModal.defaultProps = {};

export default ChampionAnnouncementModal;
