import { StyleSheet } from 'react-native';
import Colors from './Colors';

const CardStyles = StyleSheet.create({
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: Colors.shadow1,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});

export default CardStyles;
