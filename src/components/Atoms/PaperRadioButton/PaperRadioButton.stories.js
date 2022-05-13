import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PaperRadioButton from './PaperRadioButton';

const options = {
  Checked: 'checked',
  Unchecked: 'unchecked',
};

const paperRadioButtonProps = () => ({
  status: radios('Status', options, 'unchecked'),
  value: 'Y',
});

const actions = {
  onPress: action('onPress'),
};

storiesOf('— Atoms', module)
  .addDecorator(withKnobs)
  .add('RadioButton', () => (
    <PaperRadioButton {...paperRadioButtonProps()} {...actions} />
  ));
