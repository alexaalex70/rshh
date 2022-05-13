import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextField from '.';
import CenterView from '../CenterView';

storiesOf('TextField', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <TextField
      placeholder={text('Placeholder text', 'Default TextField component')}
      label={text('Label text', 'Basic label')}
    />
  ))
  .add('numeric', () => (
    <TextField
      placeholder={text('Placeholder text', 'Numeric TextField component')}
      label={text('Label text', 'Basic label')}
      subType={'numeric'}
    />
  ))
  .add('multi-line default', () => (
    <TextField
      placeholder={text('Placeholder text', 'Multi-Line TextField component')}
      label={text('Label text', 'Basic label')}
      multiline={true}
    />
  ))
  .add('organisational code', () => (
    <TextField
      placeholder={text(
        'Placeholder text',
        'Organisational code TextField component'
      )}
      label={text('Label text', 'Basic label')}
    />
  ))
  .add('email 1', () => (
    <TextField
      placeholder={text('Placeholder text', 'Email 1 TextField component')}
      label={text('Label text', 'Basic label')}
    />
  ));
