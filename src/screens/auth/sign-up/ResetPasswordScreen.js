import React, { useState, useEffect, useRef } from 'react';
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
import { createUserAccount, fetchQRCode, resetPassword } from '../../../utils/networking/API';
import { View, Text, StyleSheet, Alert } from "react-native";

const ResetPasswordScreen = ({ route, navigation }) => {
  const { setIsSignedIn, setUserId } = route.params;
  const [errorsExist, setErrorsExist] = useState(false);
  const [email, setEmail] = useState("");
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const createAlert = () =>
    Alert.alert(
      "Password sent",
      "Please check your email for further instructions",
      [
        { text: "OK", onPress: () => {
              navigation.navigate('Sign-In',{}0;
         }
      ]
    );

  const onSubmitted = async ({ email }) => {
    if (Object.keys(errors).length) {
      return;
    }
    const response = await resetPassword(email);

    if (response.status === 200) {
      createAlert();
    } else if (response.data === 'User already exists') {
    }
  };

  var qr = '';
  useEffect(async () => {
  }, []);
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      {/* <Image
        containerStyle={styles.logoImageContainer}
        style={styles.logoImage}
        source={require('../../../../assets/images/logo-white.png')}
      /> */}

      <Text>Please enter the email address associated with your account</Text>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{ required: true, minLength: 2 }}
          render={({ onChange, value, name }) => (
            <View style={styles.formFieldContainer}>
              <Input
                name="email"
                inputContainerStyle={FormStyles.inputContainer}
                label="Email"
                labelStyle={styles.labelText}
                placeholder="Enter an email"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="email"
                value={email}
                onChangeText={(newEmail) => {
                  setEmail( newEmail )
                }}
                onSubmitEditing={handleSubmit(onSubmitted)}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Reset Password"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={handleSubmit(onSubmitted)}
        />
      </View>
      <View>
      <Text style={styles.countdownText}>Check your Swym email for a temporary recovery password</Text>
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
    fontFamily:'LuckiestGuy-Regular',
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

ResetPasswordScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

ResetPasswordScreen.defaultProps = {};

ResetPasswordScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default ResetPasswordScreen;
