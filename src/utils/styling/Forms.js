import { StyleSheet } from 'react-native';
import Colors from './Colors';

const FormStyles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: Colors.grayScale1,
  },
  inputContainer_reset: {
    marginTop:10,
  },
  labelText: {
    fontSize: 15,
    fontFamily:'Lato-Bold',
    //fontWeight: '600',
    marginRight: 24,
  },

  errorText: {
    fontFamily:'Lato-Regular',
    color: Colors.errorRed,
    fontSize: 13,
  },
});

export default FormStyles;

