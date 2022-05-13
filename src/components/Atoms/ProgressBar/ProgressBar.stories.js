import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ProgressBar from './ProgressBar';
import CenterView from '../CenterView';

storiesOf('— Atoms', module)
  .addDecorator((getStory) => (
    <CenterView>
      <View style={{ width: '90%' }}>{getStory()}</View>
    </CenterView>
  ))
  .add('Progress Bar', () => <ProgressBar color="red" />);
