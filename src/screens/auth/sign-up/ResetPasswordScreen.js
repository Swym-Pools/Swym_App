import React, { useState, useEffect, useRef } from 'react';
import { Button, colors, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import SwymNameLogo from '../../../components/SwymNameLogo';
import NavigationShape from '../../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../../utils/styling/Forms';
import Colors from '../../../utils/styling/Colors';
import ButtonStyles from '../../../utils/styling/Buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavbarStyles from '../../../utils/styling/Navbar';
import { createUserAccount, fetchQRCode, resetPassword, resetVerify, resetFinalize } from '../../../utils/networking/API';
import { View, Text, StyleSheet, Alert } from "react-native";

const ResetPasswordScreen = ({ route, navigation }) => {
  const { setIsSignedIn, setUserId } = route.params;
  const [ step, setStep ] = useState( 1 );
  const [errorsExist, setErrorsExist] = useState(false);
  const [email, setEmail] = useState("");
  const [temp,  setTemp] = useState("");
  const [password,  setPassword] = useState("");
  const [confirm,  setConfirm] = useState("");
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const createAlert = () =>
    Alert.alert(
      "Password reset",
      "Your password was reset successfully.",
      [
        { 
          text: "OK", 
          onPress: () => {
              navigation.navigate('Sign-In',{});
         }
        }
      ]
    );
  const createIssueAlert = (msg) =>
    Alert.alert(
      "Error", 
      msg,
      [
        { 
          text: "OK", 
          onPress: () => {
         }
        }
      ]
    );


  const onSubmitted1 = async () => {
    if (Object.keys(errors).length) {
      return;
    }
    const response = await resetPassword(email);

    if (response.status === 200 && response.data.success) {
        setStep( 2 );
    } else if (response.status === 200 && !response.data.success) {
      createIssueAlert(response.data.msg);
    }
  };

const onSubmitted2 = async () => {
    if (Object.keys(errors).length) {
      return;
    }
    const response = await resetVerify(email, temp);

    if (response.status === 200 && response.data.success) {
        setStep( 3 );
    } else if (response.status === 200 && !response.data.success) {
      createIssueAlert(response.data.msg);
    }
  };
const onSubmitted3 = async () => {
    if (Object.keys(errors).length) {
      return;
    }

    if ( password !== confirm ) {
        createIssueAlert("Passwords do not match");
        return;
    }
    const response = await resetFinalize(email, password);

    if (response.status === 200 && response.data.success) {
      createAlert();
    } else if (response.status === 200 && !response.data.success) {
      createIssueAlert(response.data.msg);
    }
  };

  const buildForm = () => {
      console.log("building form step is ", step);
    if ( step === 1 ) {
        return (
            <>
               <Text style={styles.topText}>Please enter the email address associated with your account</Text>

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
                inputContainerStyle={FormStyles.inputContainer_reset}
                label="Email"
                labelStyle={styles.labelText}
                placeholder="Enter an email"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="email"
                value={email}
                onChangeText={(newEmail) => {
                    console.log("setting email to ", newEmail)
                  setEmail( newEmail )
                }}
                onPress={handleSubmit(onSubmitted1)}
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
          onPress={onSubmitted1}
        />
      </View>
      <View>
      </View>
            </>
        );
    } else if ( step === 2 ) {
    return (
            <>
               <Text style={styles.topText}>Please enter your reset token recieved via email</Text>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{ required: true, minLength: 2 }}
          render={({ onChange, value, name }) => (
              <>
            <View style={styles.formFieldContainer}>
              <Input
                name="temp"
                inputContainerStyle={FormStyles.inputContainer_reset}
                label="Enter your reset token"
                labelStyle={styles.labelText}
                placeholder=""
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="text"
                value={temp}
                onChangeText={(newValue) => {
                  setTemp( newValue )
                }}
                onPress={handleSubmit(onSubmitted2)}
              />
            </View>
            </>

          )}
        />
        </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Submit"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={onSubmitted2}
        />
      </View>
      <View>
      </View>
            </>
        );

    } else if ( step === 3 ) {
    return (
            <>
               <Text style={styles.topText}>Please enter your new password</Text>
<View style={styles.formContainer}>
        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{ required: true, minLength: 2 }}
          render={({ onChange, value, name }) => (
              <>
            <View style={styles.formFieldContainer}>
              <Input
                name="password"
                inputContainerStyle={FormStyles.inputContainer_reset}
                label="password"
                labelStyle={styles.labelText}
                placeholder="Enter an password" 
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorAndroid={Colors.grayScale1}
                textContentType="password"
                value={password}
                onChangeText={(value) => {
                  setPassword( value )
                }}
                onPress={handleSubmit(onSubmitted3)}
              />
            </View>
            <View style={styles.formFieldContainer}>
              <Input
                name="email"
                inputContainerStyle={FormStyles.inputContainer_reset}
                label="confirm"
                labelStyle={styles.labelText}
                placeholder="Re-enter password"
                placeholderTextColor={Colors.grayScale1}
                selectionColor={Colors.grayScale1}
                underlineColorA1ndroid={Colors.grayScale1}
                textContentType="password"
                value={confirm}
                onChangeText={(value) => {
                  setConfirm( value )
                }}
                onPress={handleSubmit(onSubmitted3)}
              />
            </View>
            </>

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
          onPress={onSubmitted3}
        />
      </View>
      <View>
      </View>
            </>
        );

    } else if ( step === 4 ) {
    return (
            <>
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
                inputContainerStyle={FormStyles.inputContainer_reset}
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
                onPress={handleSubmit(onSubmitted1)}
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
          onPress={onSubmitted1}
        />
      </View>
      <View>
      </View>
            </>
        );

    }

  }
  var qr = '';
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      {/* <Image
        containerStyle={styles.logoImageContainer}
        style={styles.logoImage}
        source={require('../../../../assets/images/logo-white.png')}
      /> */}

      {buildForm()}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    topText: { 
        marginTop: 10,
        minWidth: 240,
        width: '80%',
        fontSize: 18,
        marginBottom: 20,
        color: Colors.purple,
    },

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
