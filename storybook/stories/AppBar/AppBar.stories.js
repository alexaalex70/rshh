import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import AppBar from '.';
import CenterView from '../CenterView';

storiesOf('AppBar', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <AppBar title={text('AppBar title', 'Title')} navigationIcon="close" />
  ))
  .add('with progress bar', () => (
    <AppBar
      title={text('AppBar title', 'AppBar with progress bar')}
      navigationIcon="close"
      progress={number('Progress value', 0.5)}
    />
  ));
