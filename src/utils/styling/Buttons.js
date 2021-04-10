import { StyleSheet } from 'react-native';
import Colors from './Colors';

const ButtonStyles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.orange,
    borderRadius: 18,
    height: 44,
    minWidth: 144,
  },

  actionButtonTitle: {
    color: Colors.white,
    fontSize: 22,
    //fontWeight: '500',
    fontFamily: 'Krub-Medium',
  },

  actionButtonContainer: {
    borderRadius: 18,
  },
});

export default ButtonStyles;
