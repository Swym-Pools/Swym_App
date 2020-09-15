import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styling/Colors';
import SwymNameLogo from '../../components/SwymNameLogo';
import { Button, Image, Input } from 'react-native-elements';
import ButtonStyles from '../../utils/styling/Buttons';
import NavigationShape from '../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../utils/styling/Forms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignInScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  function onSignInSubmitted({ username, password }) {
    // TODO: Process User sign in here
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
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <View style={styles.formFieldContainer}>
              <Input
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

              {errors.username && (
                <Text style={FormStyles.errorText}> A username is required.</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <View style={styles.formFieldContainer}>
              <Input
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

              {errors.password && <Text style={FormStyles.errorText}>A password is required.</Text>}
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
    </KeyboardAwareScrollView>
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
            navigation.replace('Sign-Up');
          }}
        />
      );
    },
  };
};

export default SignInScreen;
