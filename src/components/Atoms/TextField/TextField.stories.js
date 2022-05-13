import { radios, boolean, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextField from './TextField';
import CenterView from '../CenterView';

const options = {
  INTEGER: 'INTEGER',
  DECIMAL: 'DECIMAL',
  TEL: 'TEL',
  EMAIL: 'EMAIL',
  TEXT: 'TEXT',
};

const textFieldProps = () => ({
  labelText: object('Label Text', { en: 'Current Label Text' }),
  placeholder: object('Placeholder Text', { en: 'Current Placeholder' }),
  multiline: boolean('multiline', false),
  subType: radios('Keyboard Type', options, 'default'),
});

storiesOf('— Atoms', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Text Field', () => <TextField {...textFieldProps()} />);
