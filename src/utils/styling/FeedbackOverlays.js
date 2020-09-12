import { StyleSheet } from 'react-native';
import Colors from './Colors';

const FeedbackOverlayStyles = StyleSheet.create({
  messageText: {
    fontSize: 18,
    fontWeight: '700',
  },

  overlayWrapper: {
    padding: 0,
  },

  confirmationButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  confirmationButtonContent: {
    borderRadius: 6,
    minWidth: 120,
  },
});

export default FeedbackOverlayStyles;
