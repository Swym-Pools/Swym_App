import { StyleSheet } from 'react-native';
import Colors from './Colors';

const FormStyles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: Colors.grayScale1,
  },

  labelText: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 24,
  },

  errorText: {
    color: Colors.errorRed,
    fontSize: 13,
  },
});

export default FormStyles;
