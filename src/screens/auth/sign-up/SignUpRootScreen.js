import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationShape from '../../../data/shapes/Navigation';
import SwymNameLogo from '../../../components/SwymNameLogo';
import { Button, Image } from 'react-native-elements';
import ButtonStyles from '../../../utils/styling/Buttons';
import Colors from '../../../utils/styling/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignUpRootScreen = ({ navigation }) => {
  function navigateToSignInScreen() {
    navigation.replace('Sign-In');
  }

  function navigateToSignUpForm() {
    navigation.navigate('Sign-Up Form');
  }

  return (
    <View style={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <Image
        containerStyle={styles.logoImageContainer}
        style={styles.logoImage}
        progressiveRenderingEnabled
        source={require('../../../../assets/images/logo-white.png')}
      />

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Sign Up"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={navigateToSignUpForm}
        />
      </View>

      <View style={styles.signInLinkContainer}>
        <Text style={styles.signInMessageText}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToSignInScreen}>
          <Text style={styles.signInLinkText}>Sign In</Text>
        </TouchableOpacity>
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
    marginBottom: 48,
    width: 120,
  },

  logoImage: {
    height: '90%',
    shadowColor: Colors.deepblue,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '90%',
  },

  actionButtonsContainer: {
    marginBottom: 48,
  },

  signInLinkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  signInMessageText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '300',
  },

  signInLinkText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
});

SignUpRootScreen.propTypes = {
  navigation: NavigationShape.isRequired,
};

SignUpRootScreen.defaultProps = {};

export default SignUpRootScreen;
