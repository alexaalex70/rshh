import React, { FC } from 'react';
import { Button } from 'react-native-paper';
import { PaperButtonProps } from '../../../config/interfaces';

export const PaperButton: FC<PaperButtonProps> = ({
  label = '',
  onPress,
  mode = 'text',
  dark = false,
  loading = false,
  icon = '',
  disabled = false,
  contentStyle = {},
  labelStyle = {},
  style = {},
}) => {
  return (
    <Button
      onPress={onPress}
      mode={mode}
      dark={dark}
      loading={loading}
      icon={icon}
      disabled={disabled}
      labelStyle={labelStyle}
      style={style}
      contentStyle={contentStyle}
    >
      {label}
    </Button>
  );
};

export default PaperButton;
