import { Platform } from 'react-native';

export default function useKeyboardAvoidingViewBehavior() {
  return Platform.OS === 'ios' ? 'padding' : 'none';
}
