import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import PaperButton from '../../Atoms/PaperButton/PaperButton';
import { IconButton, TextInput } from 'react-native-paper';

import { colors } from '../../../config/colors';
import {
  isValidResponse,
  RHPfetch,
  RHPResponse,
} from '../../../config/apiWrapper';
import { REACT_APP_CHANNEL_API } from '@env';

interface ChannelMessageEditorProps {
  closeFunc: () => void;
  channelId: string;
  actions: () => void;
  stackType:
    | 'MESSAGE_MENTOR_TO_MEMBER'
    | 'MESSAGE_MEMBER_TO_MENTOR'
    | 'MESSAGE_MEMBER_TO_CLINICIAN';
}

const ChannelMessageEditor: FC<ChannelMessageEditorProps> = ({
  closeFunc,
  channelId,
  actions,
  stackType,
}) => {
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState<string>(' ');
  const [draftStack, setDraftStack] = useState<any>();
  useEffect(() => {
    const createDraftStack = async () => {
      const res = await RHPfetch(`${REACT_APP_CHANNEL_API}/stack`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({
          stackType: stackType,
          channelId: channelId,
          message: {
            body: message,
          },
        }),
      });
      if (isValidResponse(res)) {
        const result = await RHPResponse(res);
        setDraftStack(result.body);
      }
    };
    createDraftStack();
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addStackToChannel = async (channelId: string, stackId: string) => {
    if (!draftStack) return;
    await RHPfetch(`${REACT_APP_CHANNEL_API}/stack/${stackId}`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        message: {
          body: message,
        },
      }),
    });
    await RHPfetch(`${REACT_APP_CHANNEL_API}/channel/${channelId}/stack`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        stackId: stackId,
      }),
    });
    actions();
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
        }}
      >
        <Text style={styles.title}>New Message</Text>
        <IconButton
          icon="close"
          color={colors.electricViolet}
          size={20}
          onPress={closeFunc}
        />
      </View>
      <View style={{ height: 160 }}>
        <TextInput
          value={message}
          onChangeText={(val) => setMessage(val)}
          multiline
          autoComplete="off"
          style={{ height: '100%' }}
        />
      </View>
      <PaperButton
        label="Send"
        onPress={() => addStackToChannel(channelId, draftStack?.id)}
        mode="contained"
        labelStyle={{ color: 'white' }}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    elevation: 2,
    paddingBottom: 36,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.15,
  },
});

export default ChannelMessageEditor;
