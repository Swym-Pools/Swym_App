import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
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
import { createUserAccount, fetchTOTPCode, saveTOTP } from '../../../utils/networking/API';

const SignUpTOTPScreen = ({ route }) => {
  var userId = route.params.userId;
  const { setIsSignedIn, setUserId } = route.params;
  const [errorsExist, setErrorsExist] = useState(false);
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const [code, setCode] = useState({"loaded": false, "code": null});
  const onSubmitted = async () => {
    console.log("SUBMIT");
    const response = await saveTOTP(userId, code.code);
    console.log("status", response.status)
    if (response.status === 200) {
      setIsSignedIn(true);
    } else {
      setError('api', { type: 'manual', message: 'API error' });
    }
  };
useEffect(() => {
    (async() => {
      var response = await fetchTOTPCode(userId);
      var data = response.data;
      console.log('code is ', data.code);
      setCode( {"loaded": true, "code": data.code });
    })();
  }, []);

  if ( !code.loaded ) {
    return (
        <>
         <Text>Loading..</Text>
        </>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <View style={styles.formContainer}>
        <Text style={styles.totpHeader}>
          To setup 2FA please add the following code to your authenticator:
        </Text>
        <TextInput 
        style={styles.totp} 
        defaultValue={code.code} 
        value={code.code}
        onChange={(evt) => {
          setCode( code ); 
        }}
        ></TextInput>
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Submit"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={onSubmitted}
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
  totpHeader: {
    color: Colors.black,
    fontSize:16 
  },
  totp: {
    color: Colors.black,
    fontSize: 32
  },
});

SignUpTOTPScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

SignUpTOTPScreen.defaultProps = {};

SignUpTOTPScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default SignUpTOTPScreen;
