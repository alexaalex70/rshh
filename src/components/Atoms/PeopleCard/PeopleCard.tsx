import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../config/colors';
import { Divider, Badge } from 'react-native-paper';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

interface PeopleCard {
  name: string;
  showAvatar: boolean;
  showUnder: boolean;
  showNotification: boolean;
  channelId: string;
  handleNavToProfile: (item: any) => void;
  channel: any;
  navigation: any;
}

const PeopleCard: FC<PeopleCard> = ({
  name,
  showAvatar,
  showUnder,
  showNotification,
  handleNavToProfile,
  channelId,
  channel,
  navigation,
}) => {
  const handleOnClick = () =>
    navigation.navigate('Question Card', {
      channelId: channelId,
      stackId: undefined,
    });

  const handleNavToProfileFunc = () => {
    handleNavToProfile(channel);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnClick}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 16,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={handleNavToProfileFunc}>
            <UserAvatar
              size={48}
              style={{ zIndex: 99 }}
              name={showAvatar ? name : '#'}
              bgColor={colors.blueChalk}
              textColor={colors.electricViolet}
              textStyle={{ fontSize: 20, fontWeight: 'bold' }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Text>{name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {showNotification ? (
              <Badge size={12} style={{ backgroundColor: colors.error }} />
            ) : null}
          </View>
        </View>
        {showUnder ? (
          <Divider
            style={{
              marginVertical: 1,
              backgroundColor: '#EEEEEE',
              marginHorizontal: 20,
            }}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});

export default PeopleCard;
