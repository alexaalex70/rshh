import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PaperCheckbox from './PaperCheckbox';

const options = {
  Checked: 'checked',
  Unchecked: 'unchecked',
  Indeterminate: 'indeterminate',
};

const paperCheckboxButtonProps = () => ({
  status: radios('Status', options, 'unchecked'),
  key: 2,
});

const actions = {
  onPress: action('onPress'),
};

storiesOf('— Atoms', module)
  .addDecorator(withKnobs)
  .add('CheckBox', () => (
    <PaperCheckbox {...paperCheckboxButtonProps()} {...actions} />
  ));
