import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  withKnobs,
  text,
  boolean,
  select,
  object,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PaperButton from './PaperButton';

const options = {
  Text: 'text',
  Outlined: 'outlined',
  Contained: 'contained',
};

const paperButtonProps = () => ({
  label: text('Button text', 'Hello Button'),
  mode: select('Mode', options, 'text'),
  style: object('Button Style', { width: '50%' }),
  labelStyle: object('Label style', { color: 'white' }),
  contentStyle: object('Content style', { backgroundColor: 'blue' }),
  disabled: boolean('Button disabled', false),
  dark: boolean('Dark effect on press', false),
  loading: boolean('Loading', false),
  compact: boolean('Compact', false),
});

const actions = {
  onPress: action('onPress'),
};

storiesOf('— Atoms', module)
  .addDecorator(withKnobs)
  .add('Default Button', () => (
    <PaperButton {...paperButtonProps()} {...actions} />
  ))
  .add('Button with Icon', () => (
    <PaperButton icon="camera" {...paperButtonProps()} {...actions} />
  ));
