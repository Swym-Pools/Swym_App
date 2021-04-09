import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import UserAccountShape from '../../data/model-shapes/UserAccount';
import { Input, Button } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import Colors from '../../utils/styling/Colors';
import FormStyles from '../../utils/styling/Forms';

const AccountEditScreen = ({
  navigation,
  route: {
    params: { currentAccount, onSave, updateUser },
  },
}) => {
  const [username, setUsername] = useState(currentAccount.username);
  const [email, setEmail] = useState(currentAccount.email);
  const [phoneNumberString, setPhoneNumberString] = useState(`${currentAccount.phoneNumber}` || '');
  const [withdrawalAddress, setWithdrawalAddress] = useState(
    currentAccount.withdrawalAddress || '',
  );
  const [errors, setErrors] = useState({});

  const editedAccount = useMemo(() => {
    return {
      id: currentAccount.id,
      username,
      email,
      // phoneNumber: Number(phoneNumberString),
      withdrawalAddress,
    };
  }, [currentAccount.id, username, email, phoneNumberString, withdrawalAddress]);

  // TODO: More robust validation for these values.
  const isSaveEnabled = useMemo(() => {
    return (
      username.trim().length !== 0 &&
      email.trim().length !== 0 &&
      // String(phoneNumberString).trim().length !== 0 &&
      withdrawalAddress.trim().length !== 0
    );
  }, [username, email, phoneNumberString, withdrawalAddress]);

  async function saveChanges() {
    const response = await onSave(editedAccount);
    if (response.status === 200) {
      updateUser(response.data);
      navigation.goBack();
    } else if (response.data === 'Validation error') {
      setErrors({ ...errors, username: 'Username or Email is taken' });
    }
  }

  function onUsernameChanged(newValue) {
    setUsername(newValue);
  }

  function onEmailChanged(newValue) {
    setEmail(newValue);
  }

  function onPhoneNumberStringChanged(newValue) {
    const numberOnlyValue = Number(newValue);
    if (!Number.isNaN(numberOnlyValue) && newValue.length <= 10) {
      if (errors.phoneNumber) {
        const errorsUpdate = { ...errors };
        delete errorsUpdate.phoneNumber;
        setErrors(errorsUpdate);
      }
      setPhoneNumberString(newValue);
    }
  }

  const onWithdrawalAddressChanged = useCallback((newValue) => {
    setWithdrawalAddress(newValue);
  }, []);

  async function handleSubmit() {
    if (isSaveEnabled === false) {
      return;
    }
    saveChanges();
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <SafeAreaView style={styles.outerViewContentContainer}>
        <View style={styles.innerViewContentContainer}>
          <View style={{ ...styles.nonTrailingViewSection, ...styles.accountInfoSection }}>
            <Input
              containerStyle={styles.nonTrailingInfoItem}
              inputContainerStyle={FormStyles.inputContainer}
              label="Username"
              labelStyle={[FormStyles.labelText, styles.labelText]}
              placeholder="Enter a username"
              placeholderTextColor={Colors.grayScale1}
              selectionColor={Colors.grayScale1}
              underlineColorAndroid={Colors.grayScale1}
              textContentType="username"
              value={username}
              onChangeText={onUsernameChanged}
              onSubmitEditing={handleSubmit}
              errorMessage={errors.username ? errors.username : ''}
            />

            <Input
              containerStyle={styles.nonTrailingInfoItem}
              inputContainerStyle={FormStyles.inputContainer}
              label="Email"
              labelStyle={[FormStyles.labelText, styles.labelText]}
              placeholder="Enter an email address"
              placeholderTextColor={Colors.grayScale1}
              selectionColor={Colors.grayScale1}
              underlineColorAndroid={Colors.grayScale1}
              textContentType="emailAddress"
              value={email}
              onChangeText={onEmailChanged}
              onSubmitEditing={handleSubmit}
            />

            {/* <Input
              containerStyle={styles.nonTrailingInfoItem}
              inputContainerStyle={FormStyles.inputContainer}
              label="Phone Number"
              labelStyle={[FormStyles.labelText, styles.labelText]}
              placeholder="Enter a phone Number"
              placeholderTextColor={Colors.grayScale1}
              selectionColor={Colors.grayScale1}
              underlineColorAndroid={Colors.grayScale1}
              textContentType="telephoneNumber"
              value={phoneNumberString}
              onChangeText={onPhoneNumberStringChanged}
              onSubmitEditing={handleSubmit}
            /> */}

            <Input
              inputContainerStyle={FormStyles.inputContainer}
              label="Withdrawal Address"
              labelStyle={[FormStyles.labelText, styles.labelText]}
              placeholder="BTC Wallet Address"
              placeholderTextColor={Colors.grayScale1}
              selectionColor={Colors.grayScale1}
              underlineColorAndroid={Colors.grayScale1}
              value={withdrawalAddress}
              onChangeText={onWithdrawalAddressChanged}
              onSubmitEditing={handleSubmit}
            />
          </View>

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

          <Text style={styles.helpText}>Need more help? Contact support at info@swympools.org</Text>
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

  labelText: {
    color: Colors.purple,
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
    fontFamily:'Krub-Bold',
    //fontWeight: 'bold',
    textAlign: 'center',
  },
});

AccountEditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      currentAccount: UserAccountShape,
      onSave: PropTypes.func.isRequired,
      updateUser: PropTypes.func.isRequired,
    }),
  }),
};

AccountEditScreen.defaultProps = {};

export default AccountEditScreen;
