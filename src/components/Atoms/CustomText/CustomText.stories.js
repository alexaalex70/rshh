import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, object } from '@storybook/addon-knobs';

import CustomText from './CustomText';

const customTextProps = () => ({
  hint: 'Text Hint Example',
  accessibilityDescription: 'Just a simple text',
  style: object('Text Style', { fontSize: 30, fontWeight: 'bold' }),
});

storiesOf('— Atoms', module)
  .addDecorator(withKnobs)
  .add('Text', () => (
    <CustomText {...customTextProps()}>Just a simple text.</CustomText>
  ));
