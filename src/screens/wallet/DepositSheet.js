import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import Colors from '../../utils/styling/Colors';

const DepositSheet = ({ address, onCopySelected, onShareSelected, onClose, qrCodeSize }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.qrCodeSection}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressHeadingText}>Address QR Code</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>
        {address ? <QRCode value={address} size={qrCodeSize} /> : null}
      </View>

      <TouchableOpacity
        containerStyle={styles.optionTextContainer}
        style={styles.optionTextContent}
        onPress={onCopySelected}
      >
        <Text style={styles.optionText}>Copy Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        containerStyle={styles.optionTextContainer}
        style={styles.optionTextContent}
        onPress={onShareSelected}
      >
        <Text style={styles.optionText}>Share Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        containerStyle={styles.optionTextContainer}
        style={styles.optionTextContent}
        onPress={onClose}
      >
        <Text style={[styles.optionText, styles.closeOptionText]}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.borderColorTranslucent,
    borderRadius: 16,
    borderWidth: 2,
    height: '100%',
    justifyContent: 'flex-start',
    paddingVertical: 42,
  },

  qrCodeSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  addressHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  addressHeadingText: {
    color: Colors.purple,
    //fontWeight: '700',
    fontFamily:'Lato-Bold', 
  },

  addressText: {
    color: Colors.purple,
    textAlign: 'center',
    fontFamily:'Lato-Regular', 
  },

  optionTextContainer: {
    width: '100%',
  },

  optionTextContent: {
    borderTopColor: Colors.grayScale4,
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  optionText: {
    color: Colors.blue,
    textAlign: 'center',
    //fontWeight: '600',
    fontFamily:'Lato-Bold', 
  },

  closeOptionText: {
    color: Colors.purple,
  },
});

DepositSheet.propTypes = {
  address: PropTypes.string.isRequired,
  onCopySelected: PropTypes.func,
  onShareSelected: PropTypes.func,
  onClose: PropTypes.func,
  qrCodeSize: PropTypes.number,
};

DepositSheet.defaultProps = {
  onCopySelected: () => {},
  onShareSelected: () => {},
  onClose: () => {},
  qrCodeSize: 150,
};

export default DepositSheet;
 
