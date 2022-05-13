import React, { FC } from 'react';
import { Checkbox } from 'react-native-paper';
import { colors } from '../../../config/colors';

interface PaperCheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  value: number;
  id: string;
  onPress: (key: string) => void;
  disabled: boolean;
}

export const PaperCheckbox: FC<PaperCheckboxProps> = ({
  status,
  value,
  disabled,
  onPress,
  id,
}) => {
  const handlePress = (id: string) => onPress(id);

  return (
    <Checkbox.Android
      color={colors.electricViolet}
      status={status}
      onPress={() => handlePress(id)}
      disabled={disabled}
    />
  );
};

export default PaperCheckbox;
