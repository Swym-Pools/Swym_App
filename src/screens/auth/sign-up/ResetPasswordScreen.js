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
import { createUserAccount, fetchQRCode } from '../../../utils/networking/API';

const ResetPasswordScreen = ({ route }) => {
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

    const response = await setup2FA(newUser);

    if (response.status === 200) {
      const userId = response.data.id;
      setUserId(userId);
      setIsSignedIn(true);
    } else if (response.data === 'User already exists') {
      setError('username', { type: 'manual', message: 'User already exists' });
    }
  };

  var qr = '';
  useEffect(async () => {
    var qr = await fetchQRCode(user);
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <View style={styles.formContainer}>
        <Text style={FormStyles.errorText}>
          To setup 2FA please scan the QR code below:
        </Text>
        <Image
            source={qr}
          />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Submit"
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

SignUpQRScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

SignUpQRScreen.defaultProps = {};

SignUpQRScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default ResetPasswordScreen;
