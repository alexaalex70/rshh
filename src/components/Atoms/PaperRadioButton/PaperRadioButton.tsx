import React, { FC } from 'react';
import { RadioButton } from 'react-native-paper';
import { colors } from '../../../config/colors';

interface PaperRadioButtonProps {
  value: string;
  status: 'checked' | 'unchecked';
  onPress: (updatedValue: string) => void;
  disabled: boolean;
}

export const PaperRadioButton: FC<PaperRadioButtonProps> = ({
  value,
  status,
  disabled,
  onPress,
}) => {
  const handlePress = () => onPress(value);

  return (
    <RadioButton.Android
      color={colors.electricViolet}
      value={value}
      status={status}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};

export default PaperRadioButton;
