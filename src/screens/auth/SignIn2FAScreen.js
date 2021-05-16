import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../utils/styling/Colors';
import SwymNameLogo from '../../components/SwymNameLogo';
import { Button, Image, Input } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import NavigationShape from '../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../utils/styling/Forms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateLogin } from '../../utils/networking/API';

const SignIn2FAScreen = ({ route, navigation }) => {
  var userId = route.params.userId;
  const { setIsSignedIn, setUserId } = route.params;
  const { control, handleSubmit, errors, setError } = useForm();

  const on2FASubmitted = async ({ code }) => {
    // TODO: Process User sign in here
    const response = await validate2FA(userId, {code});

    if (response.status === 200) {
      var json = JSON.parse( response.data );
      if ( json.success ) {
        setUserId(userId);
        setIsSignedIn(true);
      } else {
        setError('code', { type: 'manual', message: 'Wrong code' });
      }
    } else {
      setError('username', { type: 'manual', message: 'Wrong username and/or password' });
    }
  };

  const clickForgot = function() {
    navigation.replace('Reset-Password');
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <Image
        containerStyle={styles.logoImageContainer}
        style={styles.logoImage}
        source={require('../../../assets/images/logo-white.png')}
      />

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="code"
          defaultValue=""
          rules={{ required: true, minLength: 2 }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name={name}
                inputContainerStyle={FormStyles.inputContainer}
                label="Code"
                labelStyle={styles.labelText}
                placeholder="Enter your TOTP code"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="code"
                value={value}
                onChangeText={(value) => onChange(value)}
                // onSubmitEditing={handleSubmit(onSignInSubmitted)}
              />
              {errors.code?.type === 'required' && (
                <Text style={FormStyles.errorText}>A code is required.</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Verify"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={handleSubmit(on2FASubmitted)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },

  logoNameContainer: {
    marginBottom: 22,
    fontFamily:'LuckiestGuy-Regular',
  },

  logoImageContainer: {
    height: 120,
    marginBottom: 22,
    width: 120,
  },

  logoImage: {
    height: '90%',
    width: '90%',
  },

  formContainer: {
    marginBottom: 22,
    minWidth: 240,
    width: '80%',
  },

  formFieldContainer: {
    marginBottom: 20,
  },

  actionButtonsContainer: {
    marginBottom: 22,
  },

  navButtonContainer: {
    paddingHorizontal: 8,
  },

  labelText: {
    ...FormStyles.labelText,
    color: Colors.purple,
    fontFamily:'Lato-Regular',
  },
});

SignIn2FAScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
  setIsSignedIn: PropTypes.func,
};

SignIn2FAScreen.defaultProps = {};

SignIn2FAScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => {},
    headerRight: () => {
      return (
        <Button
          containerStyle={styles.navButtonContainer}
          title="Sign Up"
          type="clear"
          onPress={() => {
            navigation.replace('Sign-Up');
          }}
        />
      );
    },
  };
};

export default SignIn2FAScreen;
