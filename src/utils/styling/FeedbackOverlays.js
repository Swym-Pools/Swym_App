import { StyleSheet } from 'react-native';
import Colors from './Colors';

const FeedbackOverlayStyles = StyleSheet.create({
  rootContainer: {
    borderRadius: 12,
    flexBasis: '70%',
    maxWidth: 500,
    minWidth: '80%',
  },

  messageText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  overlayWrapper: {
    borderRadius: 12,
    padding: 0,
  },

  confirmationButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  confirmationButtonContent: {
    borderRadius: 6,
    minHeight: 48,
    minWidth: 120,
    paddingHorizontal: 20,
  },

  mainContentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  closeButtonContainer: {
    backgroundColor: Colors.grayScale2,
    borderRadius: 1000,
    height: 40,
    position: 'absolute',
    right: 24,
    top: 24,
    width: 40,
  },
});

export default FeedbackOverlayStyles;
