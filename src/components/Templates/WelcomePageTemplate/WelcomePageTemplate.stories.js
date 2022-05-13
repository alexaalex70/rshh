import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import welcomeTemplate from './WelcomePageTemplate';

const defaultStyle = {
  outline: '1px solid #eee',
  backgroundColor: 'rgba(220, 220, 220, .6)',
  minHeight: 200,
  height: '100%',
};

const defaultStyle2 = {
  outline: '1px solid #eee',
  backgroundColor: 'white',
  marginBottom: 2,
};

storiesOf('— Templates', module).add(
  'Flex template with full width row',
  () => (
    <View style={[welcomeTemplate.default, defaultStyle]}>
      <View style={[welcomeTemplate.box, defaultStyle2]} />
      <View style={[welcomeTemplate.box, defaultStyle2]} />
      <View style={[welcomeTemplate.box, defaultStyle2]} />
      <View style={[welcomeTemplate.box, defaultStyle2]} />
      <View style={[welcomeTemplate.box, defaultStyle2]} />
    </View>
  )
);
