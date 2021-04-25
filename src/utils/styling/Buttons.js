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
    fontFamily: 'Lato-Regular',
  },

  actionButtonContainer: {
    borderRadius: 18,
  },

  actionButton2: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    height: 44,
    minWidth: 400,
  },

  actionButtonTitle2: {
    color: Colors.blue,
    fontSize: 22,
    //fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  actionButtonContainer2: {
    borderRadius: 18,
  },

});

export default ButtonStyles;
