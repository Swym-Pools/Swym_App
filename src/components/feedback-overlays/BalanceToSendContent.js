import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import Colors from '../../utils/styling/Colors';
import { withdrawFunds } from '../../utils/networking/API';

const BalanceToSendContent = ({
  userAccount,
  amountAvailable,
  loadTransactionHistory,
  onClose,
}) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onAmountChanged = useCallback((value) => {
    const numberOnlyValue = Number(value);
    if (!Number.isNaN(numberOnlyValue)) {
      setError('');
      setAmount(value.trim());
    } else {
      setError('Must enter a number');
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setDisableSubmit(true);

    if (amount < 1000) {
      setError('Amount must be greater than 1,000');
    } else if (amount > amountAvailable) {
      setError('Amount greater than amount available');
    } else {
      try {
        const reqBody = {
          amount: -amount,
          username: userAccount.username,
          withdrawalAddress: userAccount.withdrawalAddress,
        };
        const response = await withdrawFunds(userAccount.id, reqBody);
        if (response.status === 200) {
          await loadTransactionHistory(userAccount.id);
          setSuccess(true);
        }
      } catch (err) {
        setError('Something went wrong');
      }
    }

    setDisableSubmit(false);
  }, [userAccount, amount, loadTransactionHistory, amountAvailable]);

  return (
    <View style={[FeedbackOverlayStyles.rootContainer, styles.rootContainer]}>
      {!success ? (
        <View style={styles.mainContentContainer}>
          <Button
            title="X"
            buttonStyle={FeedbackOverlayStyles.closeButtonContent}
            containerStyle={FeedbackOverlayStyles.closeButtonContainer}
            onPress={onClose}
          />

          <View style={styles.mainTextContainer}>
            <Text style={[FeedbackOverlayStyles.messageText, styles.topText]} numberOfLines={1}>
              Withdraw Bitcoin
            </Text>
            <Text style={[FeedbackOverlayStyles.messageText, styles.topText]} numberOfLines={1}>
              {amountAvailable ? amountAvailable : 0} sats available
            </Text>
            <Text style={[FeedbackOverlayStyles.messageText, styles.messageText]} numberOfLines={1}>
              1,000 sats min send
            </Text>
          </View>

          <View style={styles.inputViewContainer}>
            <Input
              containerStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="Enter amount to withdraw:"
              labelStyle={styles.inputLabel}
              selectionColor={Colors.black}
              // textContentType="number"
              value={`${amount}`}
              onChangeText={onAmountChanged}
              onSubmitEditing={handleSubmit}
              keyboardType={'numeric'}
              errorMessage={error}
            />
            <Text style={[FeedbackOverlayStyles.messageText, styles.amountLabel]}>sats</Text>
            <Button
              title="Send"
              buttonStyle={[
                FeedbackOverlayStyles.confirmationButtonContent,
                styles.confirmationButtonContent,
              ]}
              titleStyle={[
                FeedbackOverlayStyles.confirmationButtonText,
                styles.confirmationButtonText,
              ]}
              onPress={handleSubmit}
              disabled={disableSubmit}
            />
          </View>
        </View>
      ) : (
        <View style={styles.successContentContainer}>
          <Button
            title="X"
            buttonStyle={FeedbackOverlayStyles.closeButtonContent}
            containerStyle={FeedbackOverlayStyles.closeButtonContainer}
            onPress={onClose}
          />

          <View style={styles.mainTextContainer}>
            <Text style={styles.successText}>
              Your BTC will be sent to your withdrawal address within 24 hours.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.blue,
  },

  mainContentContainer: {
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },

  successContentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 36,
    width: '80%',
  },

  topText: {
    color: Colors.purple,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },

  amountLabel: {
    color: Colors.purple,
    fontSize: 40,
    fontWeight: '600',
  },

  successText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  messageText: {
    color: Colors.white,
    marginBottom: 36,
  },

  inputViewContainer: {
    alignItems: 'center',
    width: '90%',
  },

  input: {
    width: '100%',
  },

  inputStyle: {
    backgroundColor: Colors.grayScale1,
    borderRadius: 10,
    color: Colors.purple,
    fontSize: 30,
    fontWeight: '600',
    height: 50,
    padding: 10,
  },

  inputLabel: {
    color: Colors.purple,
    fontSize: 18,
    fontWeight: '200',
  },

  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: 0,
    marginTop: 10,
  },

  confirmationButtonContent: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    marginTop: 20,
  },
});

BalanceToSendContent.propTypes = {
  userAccount: PropTypes.object,
  amountAvailable: PropTypes.number,
  loadTransactionHistory: PropTypes.func,
  onClose: PropTypes.func,
};

BalanceToSendContent.defaultProps = {};

export default BalanceToSendContent;
