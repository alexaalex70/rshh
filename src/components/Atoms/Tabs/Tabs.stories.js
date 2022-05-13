import { storiesOf } from '@storybook/react-native';
import { array } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import CenterView from '../CenterView';
import Tabs from './Tabs';

const TabsCool = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs
      tabs={array('Tabs', ['centimeters', 'feet'])}
      onChange={(id) => setIndex(id)}
      index={index}
    />
  );
};

storiesOf('— Atoms', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Tabs', () => <TabsCool />);
