import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';
import CheckBoxGroup from '.';

storiesOf('CheckBoxGroup', module).add('GroupCheckBox', () => (
  <CheckBoxGroup showApp={linkTo('Button')} />
));
