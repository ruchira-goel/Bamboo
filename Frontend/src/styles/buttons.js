import {StyleSheet} from 'react-native';
import COLORS from './colors';

const BUTTONS = StyleSheet.create({
  primaryButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.secondaryColor,
    backgroundColor: COLORS.secondaryColor,
    padding: 15,
    margin: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default BUTTONS;
