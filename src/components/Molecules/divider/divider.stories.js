/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text } from 'react-native';

storiesOf('— Molecules', module).add('Molecule definition', () => (
  <Text>
    They are the composition of one or more components of atoms. Here we begin
    to compose complex components and reuse some of those components. Molecules
    can have their own properties and create functionalities by using atoms,
    which alone have no function or action.
  </Text>
));
