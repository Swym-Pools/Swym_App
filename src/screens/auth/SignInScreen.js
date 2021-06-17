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

const SignInScreen = ({ route, navigation }) => {
  const { setIsSignedIn, setUserId } = route.params;
  const { control, handleSubmit, errors, setError } = useForm();

  const onSignInSubmitted = async ({ username, password }) => {
    // TODO: Process User sign in here
    const response = await validateLogin({ username, password });

    if (response.status === 200) {
      const userId = response.data.id;
      //setUserId(userId);
      //setIsSignedIn(true);
      navigation.navigate('Sign-In-2FA', {
        userId
      })
    } else if (response.data === 'Wrong username and/or password') {
      setError('username', { type: 'manual', message: 'Wrong username and/or password' });
    }
  };

  const clickForgot = function() {
    console.log("FORGOT");
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
          name="username"
          defaultValue=""
          rules={{ required: true, minLength: 2 }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name={name}
                inputContainerStyle={FormStyles.inputContainer}
                label="Username"
                labelStyle={styles.labelText}
                placeholder="Enter a username"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="username"
                value={value}
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={handleSubmit(onSignInSubmitted)}
              />
              {errors.username?.type === 'required' && (
                <Text style={FormStyles.errorText}>A username is required.</Text>
              )}
              {errors.username?.type === 'minLength' && (
                <Text style={FormStyles.errorText}>Please choose a longer name.</Text>
              )}
              {errors.username?.message === 'Wrong username and/or password' && (
                <Text style={FormStyles.errorText}>{errors.username.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{ required: true, minLength: 4 }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name={name}
                inputContainerStyle={{ ...FormStyles.inputContainer }}
                label="Password"
                labelStyle={styles.labelText}
                placeholder="Enter a password"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="password"
                secureTextEntry
                value={value}
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={handleSubmit(onSignInSubmitted)}
              />

              {errors.password?.type === 'required' && (
                <Text style={FormStyles.errorText}>A password is required.</Text>
              )}
              {errors.password?.type === 'minLength' && (
                <Text style={FormStyles.errorText}>Please try a longer password.</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Sign In"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={handleSubmit(onSignInSubmitted)}
        />
      </View>
      <View>
      {/* <Text style={styles.countdownText}>Email info@swympools.org with issues</Text> */}
      <Text onPress={clickForgot} style={styles.countdownText}>Forgot username or password ?</Text>
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

SignInScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
  setIsSignedIn: PropTypes.func,
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
            navigation.replace('Sign-Up');
          }}
        />
      );
    },
  };
};

export default SignInScreen;
