import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import React from 'react';

const logo = require('../../assets/images/logo-black.png');
export const WrongRoleScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>
        You are unable to access Roczen via this application. Please sign in
        through the web application.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    padding: 32,
  },
  image: {
    resizeMode: 'contain',
    height: 64,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
