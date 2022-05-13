import React, { FC } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import TimeAgo from 'javascript-time-ago';

import { AppBar, CentreCard } from '../../components';
import { colors } from '../../config/colors';
import { RootState } from '../../store/reducers/rootReducer';

const ActionCentre: FC<any> = ({ navigation }) => {
  const { events } = useSelector((state: RootState) => state.events);

  const timeAgo = new TimeAgo('en-GB');

  const handleOnPressNotification = (item: any) => {
    navigation.navigate('Question Card', {
      channelId: item.stack.channelId,
      stackId: item.stack.id,
    });
  };

  const renderEvent = (item: any) => {
    return (
      <View style={{ flex: 1 }}>
        <CentreCard
          id={item.cardId}
          userId={item.createdBy.id}
          message={item.message && item.message.en ? item.message.en : ''}
          handleOnPressCard={() => handleOnPressNotification(item)}
          date={timeAgo.format(new Date(item.createdAt), 'mini')}
          initials={item.createdBy.avatarInitials}
        />
        <Divider style={{ marginVertical: 5 }} />
      </View>
    );
  };

  return (
    <>
      <AppBar
        title="Action Centre"
        navigationIcon="arrow-left"
        navigation={navigation}
      />
      <SafeAreaView style={styles.wrapper}>
        <FlatList
          data={events === undefined ? [] : events}
          renderItem={({ item }) => renderEvent(item)}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 10,
  },
});

export default ActionCentre;
