import { TextStyle, ViewStyle } from 'react-native';

export interface PaperButtonProps {
  label?: string;
  onPress: () => void;
  show?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
  dark?: boolean;
  compact?: boolean;
  loading?: boolean;
  icon?: string;
  disabled?: boolean;
  contentStyle?: ViewStyle;
  labelStyle?: TextStyle;
  style?: ViewStyle;
}

export interface CompoundTextFields {
  currentIndex: number;
  onChange?: (x: number) => void;
  answer: any;
}
