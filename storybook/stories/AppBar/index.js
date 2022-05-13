import React from 'react';
import { Appbar as Header, ProgressBar } from 'react-native-paper';
import { Text, View } from 'react-native';

// actionItem(s) could be multiple buttons, gotta create some sort of generator for those
// background color can be changed based on style -> backgroundColor

export default function AppBar({
  navigationIcon,
  title,
  actionItem,
  overflowMenu,
  accesibility,
  container,
  progress,
  progressBarColor,
}) {
  return (
    <View style={{ width: '100%' }}>
      <Header
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Header.Action
            icon={navigationIcon}
            color={'white'}
            onPress={() => actionItem()}
          />
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18 }}>
            {title}
          </Text>
        </View>
        <Header.Action
          icon="wrench"
          onPress={() => console.log('Pressed for module helper')}
        />
      </Header>
      {progress && (
        <ProgressBar progress={0.5} color={progressBarColor || 'white'} />
      )}
    </View>
  );
}
