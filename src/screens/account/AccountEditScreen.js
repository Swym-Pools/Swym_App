import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import UserAccountShape from '../../data/model-shapes/UserAccount';
import { Input, Button } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import Colors from '../../utils/styling/Colors';
import useKeyboardAvoidingViewBehavior from '../../utils/hooks/UseKeyboardAvoidingViewBehavior';

const AccountEditScreen = ({
  navigation,
  route: {
    params: { currentAccount, onSave },
  },
}) => {
  const [username, setUsername] = useState(currentAccount.username);
  const [email, setEmail] = useState(currentAccount.email);
  const [phoneNumberString, setPhoneNumberString] = useState(`${currentAccount.phoneNumber}`);
  const [withdrawalAddress, setWithdrawalAddress] = useState(currentAccount.withdrawalAddress);

  const keyboardAvoidingViewBehavior = useKeyboardAvoidingViewBehavior();

  const editedAccount = useMemo(() => {
    return {
      id: currentAccount.id,
      username,
      email,
      phone: Number(phoneNumberString),
      withdrawalAddress,
    };
  }, [currentAccount.id, username, email, phoneNumberString, withdrawalAddress]);


  // TODO: More robust validation for these values.
  const isSaveEnabled = useMemo(() => {
    return (
      username.trim().length !== 0 &&
      email.trim().length !== 0 &&
      phoneNumberString.trim().length !== 0 &&
      withdrawalAddress.trim().length !== 0
    );
  }, [username, email, phoneNumberString, withdrawalAddress]);

  function saveChanges() {
    onSave(editedAccount);
    navigation.goBack();
  }

  function onUsernameChanged(newValue) {
    setUsername(newValue);
  }

  function onEmailChanged(newValue) {
    setEmail(newValue);
  }

  function onPhoneNumberStringChanged(newValue) {
    setPhoneNumberString(newValue);
  }

  function onWithdrawalAddressChanged(newValue) {
    setWithdrawalAddress(newValue);
  }

  function handleSubmit() {
    if (isSaveEnabled === false) {
      return;
    }

    saveChanges();
  }

  const AccountInfoSection = () => {
    return (
      <View style={{ ...styles.nonTrailingViewSection, ...styles.accountInfoSection }}>
        <Input
          containerStyle={styles.nonTrailingInfoItem}
          inputContainerStyle={styles.inputContainer}
          label="Username"
          labelStyle={styles.labelText}
          placeholder="Enter a username"
          placeholderTextColor={Colors.grayScale1}
          selectionColor={Colors.grayScale1}
          underlineColorAndroid={Colors.grayScale1}
          textContentType="username"
          value={username}
          onChangeText={onUsernameChanged}
          onSubmitEditing={handleSubmit}
        />

        <Input
          containerStyle={styles.nonTrailingInfoItem}
          inputContainerStyle={styles.inputContainer}
          label="Email"
          labelStyle={styles.labelText}
          placeholder="Enter an email address"
          placeholderTextColor={Colors.grayScale1}
          selectionColor={Colors.grayScale1}
          underlineColorAndroid={Colors.grayScale1}
          textContentType="emailAddress"
          value={email}
          onChangeText={onEmailChanged}
          onSubmitEditing={handleSubmit}
        />

        <Input
          containerStyle={styles.nonTrailingInfoItem}
          inputContainerStyle={styles.inputContainer}
          label="Phone Number"
          labelStyle={styles.labelText}
          placeholder="Enter a phone Number"
          placeholderTextColor={Colors.grayScale1}
          selectionColor={Colors.grayScale1}
          underlineColorAndroid={Colors.grayScale1}
          textContentType="telephoneNumber"
          value={phoneNumberString}
          onChangeText={onPhoneNumberStringChanged}
          onSubmitEditing={handleSubmit}
        />

        <Input
          inputContainerStyle={styles.inputContainer}
          label="Withdrawal Address"
          labelStyle={styles.labelText}
          placeholder="BTC Wallet Address"
          placeholderTextColor={Colors.grayScale1}
          selectionColor={Colors.grayScale1}
          underlineColorAndroid={Colors.grayScale1}
          value={withdrawalAddress}
          onChangeText={onWithdrawalAddressChanged}
          onSubmitEditing={handleSubmit}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <SafeAreaView style={styles.outerViewContentContainer}>

        <View style={styles.innerViewContentContainer}>
          <AccountInfoSection />

          <View style={[styles.nonTrailingViewSection, styles.actionButtonSection]}>
            <Button
              containerStyle={ButtonStyles.actionButtonContainer}
              buttonStyle={[ButtonStyles.actionButton]}
              titleStyle={ButtonStyles.actionButtonTitle}
              title="save"
              onPress={saveChanges}
              disabled={!isSaveEnabled}
              raised
            />
          </View>

          <Text style={styles.helpText}>Need more help? Contact support at info@playswym.com</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.blue,
    flex: 1,
  },

  outerViewContentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 64,
  },

  innerViewContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },

  accountInfoSection: {
    width: '100%',
  },

  inputContainer: {
    borderBottomColor: Colors.grayScale1,
  },

  labelText: {
    color: Colors.purple,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 24,
  },

  nonTrailingViewSection: {
    marginBottom: 24,
  },

  nonTrailingInfoItem: {
    marginBottom: 14,
  },

  helpText: {
    color: Colors.purple,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

AccountEditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      currentAccount: UserAccountShape,
      onSave: PropTypes.func.isRequired,
    }),
  }),
};

AccountEditScreen.defaultProps = {};

export default AccountEditScreen;
