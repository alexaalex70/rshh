import React, { FC } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../config/colors';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

interface CentreCard {
  message: string;
  userId: string;
  date: any;
  handleOnPressCard: (id: string) => void;
  id: string;
  initials: string;
}

const CentreCard: FC<CentreCard> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.handleOnPressCard(props.id)}>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 16 }}>
        <View style={{}}>
          <UserAvatar
            size={48}
            name={props.initials}
            bgColor={colors.blueChalk}
            textColor={colors.electricViolet}
            src={`https://gondor.dev.resethealth.clinic/api/profile/1.0/profile/${props.userId}/avatar?width=48`}
            textStyle={{ fontSize: 20, fontWeight: 'bold' }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginHorizontal: 12,
            flexShrink: 1,
          }}
        >
          <Text style={{ color: colors.silverChalice, marginBottom: 12 }}>
            {props.date}
          </Text>
          <Text style={{ letterSpacing: 0.25, lineHeight: 20, fontSize: 14 }}>
            {props.message}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CentreCard;
