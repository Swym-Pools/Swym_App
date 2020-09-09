import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import UserAccountShape from '../../data/model-shapes/UserAccount';
import { Input, Button } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';


const AccountEditScreen = ({
  navigation,
  route: {
    params: { currentAccount, onSave },
  },
}) => {
  const [editedAccount, setEditedAccount] = useState(currentAccount);

  function saveChanges() {
    onSave(editedAccount);
    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <Input label="Username" placeholder="Enter a username" textContentType="username" />

      <Input
        label="Password"
        placeholder="Enter a password"
        secureTextEntry
        textContentType="password"
      />

      <Input label="Email" placeholder="Enter an email address" textContentType="emailAddress" />

      <Input
        label="Phone Number"
        placeholder="Enter a phone Number"
        textContentType="telephoneNumber"
      />

      <Input label="Withdrawal Address" placeholder="BTC Wallet Address" />

      <Button
        buttonStyle={ButtonStyles.actionButton}
        titleStyle={ButtonStyles.actionButtonTitle}
        title="save"
        onPress={saveChanges}
        raised
      />
    </View>
  );
};


const styles = StyleSheet.create({

});


AccountEditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      currentAccount: UserAccountShape,
      onSave: PropTypes.func.isRequired,
    }),
  }),
};

AccountEditScreen.defaultProps = {
};


export default AccountEditScreen;
