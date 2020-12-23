import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import ButtonStyles from '../../utils/styling/Buttons';
import useUserAccountState from '../../utils/hooks/UseUserAccountState';
import Colors from '../../utils/styling/Colors';
import Navbar from '../../components/Navbar';
import NavigationShape from '../../data/shapes/Navigation';
import { editUserAccount } from '../../utils/networking/API';

const AccountScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const {
    userAccount,
    isFetchingUserAccount,
    hasUserAccountFetchError,
    updateUser,
  } = useUserAccountState(userId);

  function onEditingSaved(editedAccount) {
    return editUserAccount(editedAccount);
  }

  function activateEditMode() {
    navigation.navigate('AccountEdit', {
      currentAccount: userAccount,
      onSave: onEditingSaved,
      updateUser,
    });
  }

  const AccountInfoSection = () => {
    return (
      <View style={[styles.nonTrailingViewSection, styles.accountInfoSection]}>
        <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Username</Text>
          <Text style={styles.infoItemText}>{userAccount?.username}</Text>
        </View>

        <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Email</Text>
          <Text style={styles.infoItemText}>{userAccount?.email}</Text>
        </View>

        <View style={[styles.infoItem, styles.nonTrailingInfoItem]}>
          <Text style={styles.infoItemHeading}>Phone Number</Text>
          <Text style={styles.infoItemText}>{userAccount?.phoneNumber}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoItemHeading}>Withdrawal Address</Text>
          <Text style={styles.infoItemText}>{userAccount?.withdrawalAddress}</Text>
        </View>
      </View>
    );
  };

  if (isFetchingUserAccount) {
    return (
      <View style={styles.rootContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <AccountInfoSection />

      <View style={[styles.nonTrailingViewSection, styles.actionButtonSection]}>
        <Button
          containerStyle={ButtonStyles.actionButtonContainer}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          title="edit"
          onPress={activateEditMode}
          raised
        />
      </View>

      <Text style={styles.helpText}>Need more help? Contact support at info@playswym.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  accountInfoSection: {
    width: '100%',
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoItemHeading: {
    color: Colors.purple,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 24,
  },

  infoItemText: {
    color: Colors.white,
    flex: 2,
    fontSize: 15,
  },

  nonTrailingViewSection: {
    marginBottom: 24,
  },

  nonTrailingInfoItem: {
    marginBottom: 28,
  },

  helpText: {
    color: Colors.purple,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

AccountScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

AccountScreen.defaultProps = {};

AccountScreen.navigationOptions = ({ route }) => {
  return {
    header: () => {
      return <Navbar title="Account" logout={route.params?.logout} />;
    },
  };
};

export default AccountScreen;
