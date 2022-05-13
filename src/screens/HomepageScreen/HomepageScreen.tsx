import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  SectionList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../config/colors';
import { PeopleCard } from '../../components';
import {
  isValidResponse,
  RHPfetch,
  RHPResponse,
} from '../../config/apiWrapper';
import { RootState } from '../../store/reducers/rootReducer';
import { ProfileState } from '../../store/models';
import { getEventByUserId } from '../../store/actions';
import { REACT_APP_CHANNEL_API } from '@env';
import { fetchProfileById } from '../../store/actions';
import { useFocusEffect } from '@react-navigation/native';
import { LogoutButton } from '../../components/Organisms/LogoutButton/LogoutButton';

const diabet = require('../../assets/images/type-2-diabetes.png');
const weight = require('../../assets/images/weight-loss.png');
const diabetsymbol = require('../../assets/images/diabetes-symbol.png');
const weightsymbol = require('../../assets/images/weight-loss-symbol.png');

const DATA_TEMPLATE: any = [
  {
    title: 'People caring for me',
    data: [],
  },
  {
    title: '', // to be removed
    data: [],
  },
  {
    title: "People I'm mentoring",
    data: [],
  },
  {
    title: 'People in my mentor group',
    data: [],
  },
];

const ChannelTypes: { [key: string]: string } = {
  CLINICIAN_MEMBER: 'My clinician',
  MENTOR_MEMBER: 'My mentor',
};

const ChannelComparator = (a: any, b: any) => {
  if (
    a.channelType === 'CLINICIAN_MEMBER' &&
    b.channelType === 'MENTOR_MEMBER'
  ) {
    return -1;
  }
  if (
    a.channelType === 'MENTOR_MEMBER' &&
    b.channelType === 'CLINICIAN_MEMBER'
  ) {
    return 1;
  }
  return 0;
};

const HomepageScreen: FC<any> = ({ navigation }) => {
  const { profile, impersonate } = useSelector(
    (state: RootState) => state.profile
  ) as ProfileState;

  const dispatch = useDispatch();

  const [channels, setChannels] = useState<any>([]);
  const dispatchForNewEvents = () => {
    profile?.body?.id && dispatch(getEventByUserId());
  };

  const fetchChannelForUser = () => {
    console.log('Fetching channel info...', profile?.body?.id);
    if (profile?.body?.id) {
      RHPfetch(
        `${REACT_APP_CHANNEL_API}/channel?user_id=${profile?.body?.id}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        }
      ).then((res) => {
        if (isValidResponse(res)) {
          RHPResponse(res).then((result: any) => {
            const profileId = profile?.body?.id;
            const DATA = JSON.parse(JSON.stringify(DATA_TEMPLATE)); // Saby: This is the only way for a proper Deep copy in JS
            console.log('Channels result:', result);
            result.body.channels.sort(ChannelComparator).map((item: any) => {
              if (item.member.id === profileId) DATA[0].data.push(item);
              else if (
                item.primaryMentor &&
                item.primaryMentor.id === profileId
              )
                DATA[2].data.push(item);
              else if (
                item.member.id !== profileId &&
                item.primaryMentor &&
                item.primaryMentor.id !== profileId
              )
                DATA[3].data.push(item);
            });
            const newChannelState = handleShowMentors(DATA);
            if (JSON.stringify(newChannelState) !== JSON.stringify(channels)) {
              console.log('Channels have been updated, setting new state');
              console.log('DATA: ', newChannelState, 'Channels: ', channels);
              setChannels(newChannelState);
            } else {
              console.log('Not refreshing channels as there are no changes.');
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    dispatchForNewEvents();
    fetchChannelForUser();
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      dispatchForNewEvents();
      fetchChannelForUser();
      console.log('=> Setting up timers...');
      const eventsInterval = setInterval(dispatchForNewEvents, 30 * 1000);
      const channelsInterval = setInterval(fetchChannelForUser, 30 * 1000);
      const profileInterval = setInterval(() => {
        console.log('---> Profile timer HIT');
        if (profile?.body?.id) {
          console.log('---> Fetching profile again');
          dispatch(
            fetchProfileById({
              userId: profile?.body?.id,
              impersonate: false,
            })
          );
        }
      }, 60 * 1000);

      return () => {
        console.log('=> Cancelling timers...');
        clearInterval(profileInterval);
        clearInterval(eventsInterval);
        clearInterval(channelsInterval);
      };
      // Improve
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile])
  );

  const handleNavToProfile = (item: any) => {
    navigation.navigate('Channel Info', {
      channelId: item.id,
    });
  };

  const handleBackground = () => {
    if (!profile?.body?.programme) return null;
    else if (profile?.body?.programme === 'WEIGHT_LOSS') return weight;
    else return diabet;
  };

  const handleTitle = () => {
    if (!profile?.body?.programme) return null;
    else if (profile?.body?.programme === 'WEIGHT_LOSS') return 'Weight Loss';
    else return 'Type 2 Diabetes';
  };

  const notificationOnChannel = (channel: any) => {
    let result = false;

    if (channel?.lastStackId) {
      console.log('There is a last message ID: ', channel.lastStackId);
      if (channel.member.id === profile?.body?.id) {
        console.log(
          'Notification: member of the channel',
          channel?.memberAccessState?.latestReadStackId
        );
        result =
          channel.lastStackId !== channel?.memberAccessState?.latestReadStackId;
      } else if (channel?.primaryMentor?.id === profile?.body?.id) {
        console.log(
          'Notification: mentor of the channel',
          channel?.mentorAccessState?.latestReadStackId
        );
        result =
          channel.lastStackId !== channel?.mentorAccessState?.latestReadStackId;
      } else {
        console.log(
          'Notification: non-member & non-mentor channel',
          channel?.mentorAccessState?.latestReadStackId
        );
        result =
          channel.lastStackId !== channel?.mentorAccessState?.latestReadStackId;
      }
    }

    console.log('Notification computed: ', result);
    return result;
  };

  const renderItem = (item: any, index: any, section: any) => {
    return (
      <View
        style={[
          { backgroundColor: 'white' },
          section.data.length - 1 === index && {
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
          },
          index === 0 && {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        ]}
      >
        <PeopleCard
          key={item.id}
          name={
            section.title === "People I'm mentoring" ||
            section.title === 'People in my mentor group'
              ? item.member.displayName
              : ChannelTypes[item.channelType]
          }
          showAvatar={false}
          showUnder={index < 1}
          showNotification={notificationOnChannel(item)}
          handleNavToProfile={(item: any) => handleNavToProfile(item)}
          navigation={navigation}
          channelId={item.id}
          channel={item}
        />
      </View>
    );
  };

  const handleShowMentors = (channels: Array<any>) => {
    if (channels[2].data.length > 0 || channels[3].data.length > 0) {
      return channels;
    } else {
      return channels.splice(0, 1);
    }
  };

  return (
    <ImageBackground
      source={handleBackground()}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.screenInner}>
          {channels && (
            <SectionList
              sections={channels}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index, section }) =>
                renderItem(item, index, section)
              }
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section: { title, data } }) =>
                data.length > 0 || title === 'Mentoring' ? (
                  <Text
                    style={[
                      styles.tableTitle,
                      !profile?.body?.programme
                        ? { color: colors.black }
                        : { color: colors.white },
                      { marginTop: '5%' },
                    ]}
                  >
                    {title}
                  </Text>
                ) : null
              }
              ListHeaderComponent={
                profile?.body?.programme ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      flexDirection: 'row',
                      paddingTop: 20,
                    }}
                  >
                    <Image
                      source={
                        profile?.body?.programme === 'WEIGHT_LOSS'
                          ? weightsymbol
                          : diabetsymbol
                      }
                      style={{
                        width: 26,
                        height: 26,
                        marginRight: '1.5%',
                        marginBottom: '1%',
                      }}
                    />
                    <Text style={styles.title}>{handleTitle()}</Text>
                  </View>
                ) : null
              }
              contentContainerStyle={{ flexGrow: 1 }}
              // @ts-ignore https://github.com/facebook/react-native/issues/30161
              ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
              ListFooterComponent={() => {
                return (
                  <View style={styles.footerView}>
                    <LogoutButton
                      color={
                        profile?.body?.programme
                          ? 'white'
                          : colors.electricViolet
                      }
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  screenInner: {
    paddingHorizontal: '3.5%',
    marginTop: '1%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1,
  },
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  largeIcon: {
    width: '100%',
    height: 60,
    backgroundColor: '#985EFF',
    justifyContent: 'center',
  },
  mockText: {
    width: '100%',
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  tableTitle: {
    color: colors.black,
    letterSpacing: 0.18,
    fontSize: 24,
    lineHeight: 24,
    marginTop: '8%',
    marginBottom: '4%',
  },
  tableSubTitle: {
    color: colors.black,
    letterSpacing: 0.15,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.15,
  },
  footerView: {
    marginTop: 24,
  },
});

export default HomepageScreen;
