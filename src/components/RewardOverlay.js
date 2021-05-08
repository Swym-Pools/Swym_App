import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import ButtonStyles from '../utils/styling/Buttons';
import FeedbackOverlayStyles from '../utils/styling/FeedbackOverlays';
import { redeemCode } from '../utils/networking/API';

const RewardOverlay = ({visible, setVisible, userId}) => {
  const [code, setCode] = useState('');
  const [redeemError, setRedeemError] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  async function redeemReward() {
    const response = await redeemCode({ code, userId });
    if (response.status === 200) {
        setRedeemError('');
        setRedeemSuccess(true);
    } else {
      setRedeemError(response.data.error);
    }
  }

  function onClose() {
    setVisible(false);
    setRedeemSuccess(false);
    setRedeemError('');
  }

  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
    >
      <View style={FeedbackOverlayStyles.rootContainer}>
        <View style={FeedbackOverlayStyles.mainContentContainer}>
          <Button
            title="X"
            buttonStyle={FeedbackOverlayStyles.closeButtonContent}
            containerStyle={FeedbackOverlayStyles.closeButtonContainer}
            onPress={onClose}
          />
          {redeemSuccess
            ?
              <>
                <Text>Success!</Text>
                <Text>Check your deposits</Text>
              </>
            :
              <>
                <Input
                  placeholder="enter reward code"
                  value={code}
                  onChangeText={(value) => setCode(value)}
                  autoCorrect={false}
                  autoCapitalize='none'
                />
                { (redeemError !== '') && <Text>{redeemError}</Text> }
                <Button
                  containerStyle={ButtonStyles.actionButtonContainer}
                  buttonStyle={[ButtonStyles.actionButton]}
                  titleStyle={ButtonStyles.actionButtonTitle}
                  title="Redeem"
                  onPress={redeemReward}
                  raised
                />
              </>
          }
        </View>
      </View>
    </Overlay>
  );
};

export default RewardOverlay;