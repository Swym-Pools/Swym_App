import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import SwymNameLogo from '../../../components/SwymNameLogo';
import NavigationShape from '../../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../../utils/styling/Forms';
import Colors from '../../../utils/styling/Colors';
import ButtonStyles from '../../../utils/styling/Buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpFormScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  function onSignUpSubmitted({ username, email, password }) {
    // TODO: Process Sign Up on API and transition to main view on success
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

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
                onSubmitEditing={handleSubmit(onSignUpSubmitted)}
              />

              {errors.username && (
                <Text style={FormStyles.errorText}> A username is required.</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <View style={styles.formFieldContainer}>
              <Input
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
                <Text style={FormStyles.errorText}> An email address is required.</Text>
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
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <View style={styles.formFieldContainer}>
              <Input
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
                <Text style={FormStyles.errorText}>Password confirmation is required.</Text>
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
};

SignUpFormScreen.defaultProps = {};

export default SignUpFormScreen;
