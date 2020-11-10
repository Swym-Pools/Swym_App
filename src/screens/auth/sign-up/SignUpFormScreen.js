import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import SwymNameLogo from '../../../components/SwymNameLogo';
import NavigationShape from '../../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../../utils/styling/Forms';
import Colors from '../../../utils/styling/Colors';
import ButtonStyles from '../../../utils/styling/Buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavbarStyles from '../../../utils/styling/Navbar';
import { createUserAccount } from '../../../utils/networking/API';

const SignUpFormScreen = ({ route }) => {
  const { setIsSignedIn, setUserId } = route.params;
  const [errorsExist, setErrorsExist] = useState(false);
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const onSignUpSubmitted = async ({ username, email, password }) => {
    if (Object.keys(errors).length) {
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    const response = await createUserAccount(newUser);

    if (response.status === 200) {
      const userId = response.data.id;
      setUserId(userId);
      setIsSignedIn(true);
    } else if (response.data === 'User already exists') {
      setError('username', { type: 'manual', message: 'User already exists' });
    }
  };

  useEffect(() => {
    if (errors.username || errors.email || errors.password || errors.passwordConfirmation) {
      setErrorsExist(true);
    } else {
      setErrorsExist(false);
    }
  }, [errors.username, errors.email, errors.password, errors.passwordConfirmation]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

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
                onSubmitEditing={handleSubmit(onSignUpSubmitted)}
              />

              {errors.username && (
                <Text style={FormStyles.errorText}>
                  {errors.username.message ? errors.username.message : 'A username is required.'}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name={name}
                inputContainerStyle={FormStyles.inputContainer}
                label="Email"
                labelStyle={styles.labelText}
                placeholder="Enter an email address"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="emailAddress"
                value={value}
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={handleSubmit(onSignUpSubmitted)}
              />

              {errors.email && (
                <Text style={FormStyles.errorText}>
                  {errors.email.message ? errors.email.message : 'An email address is required.'}
                </Text>
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
                onSubmitEditing={handleSubmit(onSignUpSubmitted)}
              />

              {errors.password && <Text style={FormStyles.errorText}>A password is required.</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="passwordConfirmation"
          defaultValue=""
          rules={{
            required: true,
            validate: (value) => value === password.current || 'The passwords do not match',
          }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name={name}
                inputContainerStyle={{ ...FormStyles.inputContainer }}
                label="Confirm Password"
                labelStyle={styles.labelText}
                placeholder="Confirm Your Password"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="password"
                secureTextEntry
                value={value}
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={handleSubmit(onSignUpSubmitted)}
              />

              {errors.passwordConfirmation && (
                <Text style={FormStyles.errorText}>
                  {errors.passwordConfirmation.message
                    ? errors.passwordConfirmation.message
                    : 'Password confirmation is required.'}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Sign Up"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={handleSubmit(onSignUpSubmitted)}
          disabled={errorsExist || formState.isSubmitting}
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

  labelText: {
    ...FormStyles.labelText,
    color: Colors.purple,
  },
});

SignUpFormScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

SignUpFormScreen.defaultProps = {};

SignUpFormScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default SignUpFormScreen;
