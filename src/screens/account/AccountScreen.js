import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';
import ButtonStyles from '../../utils/styling/Buttons';
import useUserAccountState from '../../utils/hooks/UseUserAccountState';
import Colors from '../../utils/styling/Colors';
import Navbar from '../../components/Navbar';
import NavigationShape from '../../data/shapes/Navigation';
import { editUserAccount, getReferralLink } from '../../utils/networking/API';
import RewardOverlay from '../../components/RewardOverlay';
import * as SMS from 'expo-sms';

const AccountScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const {
    userAccount,
    isFetchingUserAccount,
    hasUserAccountFetchError,
    updateUser,
  } = useUserAccountState(userId);
  const [rewardOverlayVisible, setRewardOverlayVisible] = useState(false);
  const [referralError, setReferralError] = useState();

  function onEditingSaved(editedAccount) {
    return editUserAccount(editedAccount);
  }

  function activateEditMode() {
    navigation.navigate('AccountEdit', {
      currentAccount: userAccount,
      onSave: onEditingSaved,
      updateUser,
    });
  }

  function openRewardOverlay() {
    setRewardOverlayVisible(true);
  }

  async function sendReferralSMS() {
    const response = await getReferralLink({ userId });
    if (response.status === 200) {
      setReferralError('');
      const message = "Hey! I've been using Swym App to save and win Bitcoin."
        + " Try it using my code and you'll get 100 Satoshi. "
        + response.data.code;
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync([], message);
      } else {
        setReferralError('SMS not available on this device');
      }
    } else {
      setReferralError(response.data.error);
    }
  }

  const AccountInfoSection = () => {
    return (
      <View style={[styles.nonTrailingViewSection, styles.accountInfoSection]}>
        <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Username</Text>
          <Text style={styles.infoItemText}>{userAccount?.username}</Text>
        </View>

        <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Email</Text>
          <Text style={styles.infoItemText}>{userAccount?.email}</Text>
        </View>

        {/* <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Phone Number</Text>
          <Text style={styles.infoItemText}>{userAccount?.phoneNumber}</Text>
        </View> */}

        <View style={styles.infoItem}>
          <Text style={styles.infoItemHeading}>Withdrawal Address</Text>
          <Text style={styles.infoItemText}>{userAccount?.withdrawalAddress}</Text>
        </View>
      </View>
    );
  };

  const ReferralSection = () => {
    return (
      <View>
        <View style={[styles.nonTrailingViewSection, styles.actionButtonSection]}>
          <Button
            containerStyle={ButtonStyles.actionButtonContainer}
            buttonStyle={[ButtonStyles.actionButton2]}
            titleStyle={ButtonStyles.actionButtonTitle2}
            titleStyle={ButtonStyles.actionButtonTitle2}
            title="Redeem Reward"
            onPress={openRewardOverlay}
          />
        </View>

        {(referralError !== '') && <Text>{referralError}</Text>}
        <View style={[styles.nonTrailingViewSection, styles.actionButtonSection]}>
          <Button 
            containerStyle={ButtonStyles.actionButtonContainer2}
            buttonStyle={[ButtonStyles.actionButton2]}
            titleStyle={ButtonStyles.actionButtonTitle2}
            title="Refer a friend, get 100 satoshi"
            onPress={sendReferralSMS}
            raised
          />
        </View>
      </View>
    );
  };

  if (isFetchingUserAccount) {
    return (
      <View style={styles.rootContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <AccountInfoSection />

      <View style={[styles.nonTrailingViewSection, styles.actionButtonSection]}>
        <Button
          containerStyle={ButtonStyles.actionButtonContainer}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          title="edit"
          onPress={activateEditMode}
          raised
        />
      </View>

      <ReferralSection />
      <Text style={styles.helpText}>Need more help? Contact support at info@swympools.org</Text>
      <RewardOverlay
        visible={rewardOverlayVisible}
        setVisible={setRewardOverlayVisible}
        userId={userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  accountInfoSection: {
    width: '100%',
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoItemHeading: {
    color: Colors.purple,
    flex: 1,
    fontSize: 15,
    //fontWeight: '600',
    fontFamily: 'Lato-Bold',
    marginRight: 24,
  },

  infoItemText: {
    color: Colors.white,
    flex: 2,
    fontSize: 15,
    fontFamily:'Lato-Regular',
  },

  nonTrailingViewSection: {
    marginBottom: 24,
  },

  nonTrailingInfoItem: {
    marginBottom: 28,
  },

  helpText: {
    color: Colors.purple,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    //fontWeight: 'bold',
  },
});

AccountScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

AccountScreen.defaultProps = {};

AccountScreen.navigationOptions = ({ route }) => {
  return {
    header: () => {
      return <Navbar title="Account" logout={route.params?.logout} />;
    },
  };
};

export default AccountScreen;
