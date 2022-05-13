import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';

export const welcomeTemplate = StyleSheet.create({
  default: {
    display: 'flex',
    backgroundColor: colors.white,
  },
  box: {
    height: '20%',
  },
});

export default welcomeTemplate;
