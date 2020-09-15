import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styling/Colors';
import SwymNameLogo from '../../components/SwymNameLogo';
import { Button, Image, Input } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import NavigationShape from '../../data/shapes/Navigation';

const SignInScreen = ({ navigation }) => {
  function onSignInSelected() {}

  return (
    <View style={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <Image
        containerStyle={styles.logoImageContainer}
        style={styles.logoImage}
        source={require('../../../assets/images/logo-orange.png')}
      />

      <View style={styles.formContainer}>
        {/* <Input
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
        /> */}
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          title="Sign In"
          onPress={onSignInSelected}
          raised
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
  },

  logoNameContainer: {
    marginBottom: 22,
  },

  logoImageContainer: {
    height: 120,
    marginBottom: 22,
    width: 120,
  },

  logoImage: {
    height: '90%',
    shadowColor: Colors.deepblue,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '90%',
  },

  formContainer: {
    marginBottom: 12,
  },

  actionButtonsContainer: {
    marginBottom: 22,
  },

  navButtonContainer: {
    paddingHorizontal: 8,
  },
});

SignInScreen.propTypes = {
  navigation: NavigationShape.isRequired,
};

SignInScreen.defaultProps = {};

SignInScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => {},
    headerRight: () => {
      return (
        <Button
          containerStyle={styles.navButtonContainer}
          title="Sign Up"
          type="clear"
          onPress={() => {
            navigation.navigate('Sign-Up');
          }}
        />
      );
    },
  };
};

export default SignInScreen;
