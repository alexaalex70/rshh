import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { colors } from '../../../config/colors';

import { RootState } from '../../../store/reducers/rootReducer';

// There is an issue with React Native and Touchables when using abslute positioning
// Don't even think about using react-native-gesture-handler, it will ruin Android
// Don't even think of adding a View with padding, it will ruin the whole UX
// zIndex also doesn't work, trust me, I've tried everything

interface MessageCardHeaderProps {
  createdAt: string;
  stackId: string;
  stackType: string;
  handleBlockUserButton: (stackId: string) => void;
  createdBy: string;
}

const MessageCardHeader: FC<MessageCardHeaderProps> = ({
  createdAt,
  stackId,
  stackType,
  handleBlockUserButton,
  createdBy,
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleStackMenuButton = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={styles.text}>
        {moment(createdAt).format('h:mma MMM Do YYYY')}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {createdBy === profile.body.id && (
          <Text style={[styles.text, { marginRight: 8 }]}>Sent</Text>
        )}
        {(stackType === 'MESSAGE_CLINICIAN_TO_MEMBER' ||
          stackType === 'MESSAGE_MENTOR_TO_MEMBER') &&
          createdBy !== profile.body.id && (
            <IconButton
              icon="dots-vertical"
              color={colors.black}
              size={20}
              onPress={handleStackMenuButton}
            />
          )}
      </View>
      {menuOpen && (
        <Surface style={styles.menu} onStartShouldSetResponder={() => true}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              handleBlockUserButton(stackId);
              handleStackMenuButton();
            }}
          >
            <Text>Block user</Text>
          </TouchableWithoutFeedback>
        </Surface>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 16,
    top: 34,
    borderRadius: 8,
    padding: 4,
    // elevation: 4,
    // zIndex: 300
  },
  text: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.38)',
  },
});

export default MessageCardHeader;
