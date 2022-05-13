import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import AppBar from './AppBar';
import CenterView from '../CenterView';

storiesOf('— Atoms', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('App Bar', () => (
    <AppBar title={text('AppBar title', 'Title')} navigationIcon="close" />
  ));
