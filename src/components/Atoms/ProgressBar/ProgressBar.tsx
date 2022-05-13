import React, { FC } from 'react';
import { ProgressBar as Progress } from 'react-native-paper';

interface ProgressBarProps {
  progress: number;
  color?: 'white';
}

const ProgressBar: FC<ProgressBarProps> = ({
  progress = 0.5,
  color = '#6200EE',
  ...rest
}) => {
  return <Progress progress={progress} color={color} {...rest} />;
};

export default ProgressBar;
