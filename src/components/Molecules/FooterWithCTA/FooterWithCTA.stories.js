import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, object } from '@storybook/addon-knobs';

import FooterWithCTA from './FooterWithCTA';

const footerWithCTAProps = () => ({
  primaryCTA: object('primaryCTA', {
    label: 'NEXT',
    style: { borderWidth: 1, borderColor: 'gray' },
  }),
  secondaryCTA: object('secondaryCTA', { label: 'BACK' }),
  thirdCTA: object('thirdCTA', { label: 'SKIP' }),
});

storiesOf('— Molecules', module)
  .addDecorator(withKnobs)
  .add('FooterWithCTA', () => <FooterWithCTA {...footerWithCTAProps()} />);
