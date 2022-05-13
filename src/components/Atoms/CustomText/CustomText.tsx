import React, { FC } from 'react';
import { Text } from 'react-native';

interface CustomTextProps {
  style?: Object;
  accessibilityDescription?: string | undefined;
  hint?: string;
  children: React.ReactNode;
}

export const CustomText: FC<CustomTextProps> = ({
  style,
  hint = 'text hint',
  accessibilityDescription = 'Text',
  children,
}) => {
  return (
    <Text
      accessible={true}
      accessibilityLabel={accessibilityDescription}
      accessibilityHint={hint}
      accessibilityRole="text"
      style={style}
    >
      {children}
    </Text>
  );
};

export default CustomText;
