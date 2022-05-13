import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen: FC<any> = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
