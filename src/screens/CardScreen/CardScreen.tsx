import React, { FC, useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import { REACT_APP_CHANNEL_API } from '@env';

import {
  PaperButton,
  AppBar,
  ChannelMessageEditor,
  MessageCardHeader,
  QuestionCard,
} from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { UserInfoState } from '../../store/models/types/userTypes';
import { ProfileState } from '../../store/models/types/profileTypes';
import { grabQuestionSet } from '../../store/actions/questionSet/questionSet';

import { patchChannelAccessState } from '../../api/channel/channel';
import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import { colors } from '../../config/colors';
import { wait } from '../../utils/wait';
import { amIMember, amIMentor } from '../../utils/channelRole';
import { useDefferedGoBack } from './useDefferedGoBack';

const ChannelType: { [key: string]: string } = {
  CLINICIAN_MEMBER: 'Clinician',
  MENTOR_MEMBER: 'Mentor',
};

enum StackType {
  SYSTEM_TO_CLINICIAN = 'MESSAGE_SYSTEM_TO_CLINICIAN',
  SYSTEM_TO_MENTOR = 'MESSAGE_SYSTEM_TO_MENTOR',
  SYSTEM_TO_MEMBER = 'MESSAGE_SYSTEM_TO_MEMBER',
  MEMBER_TO_CLINICIAN = 'MESSAGE_MEMBER_TO_CLINICIAN',
  CLINICIAN_TO_MEMBER = 'MESSAGE_CLINICIAN_TO_MEMBER',
  MEMBER_TO_MENTOR = 'MESSAGE_MEMBER_TO_MENTOR',
  MENTOR_TO_MEMBER = 'MESSAGE_MENTOR_TO_MEMBER',
}

const CardScreen: FC<any> = ({ route, navigation }) => {
  const [channelData, setChannelData] = useState<any>(null);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [messageEditor, setMessageEditor] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [filteredStacks, setFilteredStacks] = useState<any>([]);
  const [allStacks, setAllStacks] = useState<any>([]);
  const [reportedId, setReportedId] = useState<string>();
  const [initialScroll, setInitialScroll] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);
  const { profile, impersonate } = useSelector(
    (state: RootState) => state.profile
  ) as ProfileState;

  const { token } = useSelector(
    (state: RootState) => state.user
  ) as UserInfoState;

  const dispatch = useDispatch();
  console.log('Cardscreen Route: ', route);

  useEffect(() => {
    route.params.channelId && fetchChannelData();
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchStacksForChannel();
    const interval = setInterval(fetchStacksForChannel, 5000);

    return () => {
      clearInterval(interval);
    };
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelData]);
  // TODO: use global channel data with last id in it
  const setLoading = useDefferedGoBack(navigation);
  useEffect(() => {
    if (allStacks.length > 0) {
      if (
        channelData?.member?.id === profile?.body?.id ||
        channelData?.primaryMentor?.id === profile?.body?.id
      ) {
        setLoading(true);
        patchChannelAccessState(
          route.params.channelId,
          channelData?.member?.id === profile?.body?.id
            ? {
                memberLatestReadStackId: allStacks[0].id,
              }
            : {
                mentorLatestReadStackId: allStacks[0].id,
              }
        ).finally(() => {
          setLoading(false);
        });
      }
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStacks]);

  useEffect(() => {
    if (route.params.stackId && filteredStacks.length > 3 && initialScroll) {
      const foundStack = filteredStacks.find(
        (el: any) => el.id === route.params.stackId
      );
      if (foundStack) {
        scrollToIndex(
          filteredStacks.findIndex((x: any) => x.id === foundStack.id)
        );
        setInitialScroll(false);
      } else fetchMoreStacksBefore();
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStacks]);

  const scrollToIndex = (stackIndex: number) => {
    console.log('Scrolled to index', stackIndex);
    flatListRef.current?.scrollToIndex({ animated: true, index: stackIndex });
  };

  const filterStacksForUser = (stack: any) => {
    switch (stack.stackType) {
      case StackType.SYSTEM_TO_CLINICIAN:
        return false;
      case StackType.SYSTEM_TO_MENTOR:
        amIMentor(profile?.body?.id, channelData);
      case StackType.SYSTEM_TO_MEMBER:
        amIMember(profile?.body?.id, channelData);
      case StackType.MEMBER_TO_CLINICIAN:
      case StackType.CLINICIAN_TO_MEMBER:
      case StackType.MEMBER_TO_MENTOR:
      case StackType.MENTOR_TO_MEMBER:
        return true;
      default:
        return false;
    }
  };

  const fetchStacksForChannel = () => {
    RHPfetch(
      `${REACT_APP_CHANNEL_API}/stack?channel_id=${route.params.channelId}&before_id=0max0000000000000000000000`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      }
    )
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((data: any) => {
        if (data?.body?.stacks) {
          const reversedStacks = data.body.stacks.reverse();
          console.log('Setting stacks to: ', reversedStacks);
          setAllStacks(reversedStacks);
          setFilteredStacks(reversedStacks.filter(filterStacksForUser));
        }
      })
      .catch((err: any) => console.error(err));
  };

  const fetchMoreStacksBefore = () => {
    const urlToFetch = `${REACT_APP_CHANNEL_API}/stack?channel_id=${
      route.params.channelId
    }&before_id=${allStacks[allStacks.length - 1].id}`;
    RHPfetch(urlToFetch, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((data: any) => {
        if (!data?.body?.stacks) return;
        const reversedStacks = data.body.stacks.reverse();
        console.log('Setting stacks before_id to: ', reversedStacks);
        setAllStacks(allStacks.concat(reversedStacks));
        setFilteredStacks(
          filteredStacks.concat(reversedStacks.filter(filterStacksForUser))
        );
      })
      .catch((err: any) => console.error(err));
  };

  const fetchChannelData = () => {
    RHPfetch(`${REACT_APP_CHANNEL_API}/channel/${route.params.channelId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((res: any) => {
        setChannelData(res.body);
      })
      .then(() => {
        setLoader(true);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleCardAction = (questionSet: any) => {
    dispatch(grabQuestionSet({ questionSet }));
    navigation.navigate('Questions', {
      questionSet,
      channelId: route.params.channelId,
    });
  };

  const handleChannelTitle = () => {
    if (channelData && channelData.channelType in ChannelType)
      return ChannelType[channelData.channelType];

    return '';
  };

  const messageEditorActions = () => {
    setMessageEditor(false);
  };

  const renderMessage = ({ item }: any) => {
    const systemStyles = {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderRadius: 16,
      marginHorizontal: 8,
    };

    const card =
      item.stackType === 'MESSAGE_CLINICIAN_TO_MEMBER' ||
      item.stackType === 'MESSAGE_MENTOR_TO_MEMBER'
        ? { backgroundColor: 'rgba(98, 0, 238, 0.04)' }
        : item.stackType === 'MESSAGE_MEMBER_TO_CLINICIAN' ||
          item.stackType === 'MESSAGE_MEMBER_TO_MENTOR'
        ? { backgroundColor: 'transparent' }
        : { ...systemStyles };

    // Sent is the default state we report at the moment
    // TODO: We have to add Pending status when we add offline features
    return (
      <View style={{ ...card, padding: 24, marginTop: 8, marginBottom: 8 }}>
        <MessageCardHeader
          createdAt={item.createdAt}
          stackId={item.id}
          createdBy={item.createdBy.id}
          stackType={item.stackType}
          handleBlockUserButton={(stackId: string) => handleReport(stackId)}
        />
        <Text style={{ marginTop: 8, fontSize: 16 }}>
          {item.createdBy.displayName}
        </Text>
        <Text style={{ marginTop: 8, fontSize: 14 }}>{item.message.body}</Text>
        {item.cards.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <QuestionCard
              questionSet={item.cards[0]}
              handleCardAction={handleCardAction}
            />
          </View>
        )}
      </View>
    );
  };

  const handleLoadMore = () => {
    // TODO: (idea): grab last stackId from local state, dispatch for new stacks and then add them to state so the flatlist could render them
  };

  const stackType = () => {
    if (channelData.member.id === profile.body.id) {
      if (channelData.channelType === 'MENTOR_MEMBER')
        return 'MESSAGE_MEMBER_TO_MENTOR';
      if (channelData.channelType === 'CLINICIAN_MEMBER')
        return 'MESSAGE_MEMBER_TO_CLINICIAN';
    }
    return 'MESSAGE_MENTOR_TO_MEMBER';
  };

  const modalDisplay = () => setVisibleModal(!visibleModal);

  const handleReport = (stackId: string) => {
    modalDisplay();
    setReportedId(stackId);
  };

  const reportAbuseFetch = () => {
    RHPfetch(`${REACT_APP_CHANNEL_API}/abusereport`, {
      method: 'POST',
      headers: new Headers({
        Authorization: impersonate ? `Profile ${token}` : `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        stackId: `${reportedId}`,
      }),
    })
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((res: any) => {
        console.log(
          'Tried reporting abuse, came back with following ID: ',
          res
        );
        modalDisplay();
        fetchChannelData();
      });
  };

  return (
    <>
      {loader && (
        <View style={{ flex: 1 }}>
          <AppBar
            title={handleChannelTitle()}
            avatar
            info
            infoFunc={() =>
              navigation.navigate('Channel Info', {
                channelId: route.params.channelId,
              })
            }
            navigation={navigation}
            navigationIcon="arrow-left"
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <FlatList
                ref={flatListRef}
                data={filteredStacks}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                inverted
                onScrollToIndexFailed={(info) => {
                  wait(50).then(() => {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={1}
                keyboardShouldPersistTaps="always"
              />
              {!messageEditor && (
                <FAB
                  style={{
                    backgroundColor: colors.electricViolet,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                  }}
                  icon="pencil"
                  disabled={channelData.state !== 'ACTIVE'}
                  onPress={() => setMessageEditor(true)}
                />
              )}
              {messageEditor && (
                <ChannelMessageEditor
                  stackType={stackType()}
                  closeFunc={() => setMessageEditor(false)}
                  channelId={route.params.channelId}
                  actions={messageEditorActions}
                />
              )}
            </View>
          </KeyboardAvoidingView>
          <Modal isVisible={visibleModal}>
            <View style={styles.modalStyle}>
              <Text style={styles.modalTitle}>Block user</Text>
              <Text style={styles.modalBodyText}>
                To block this user and report abuse, please confirm and our team
                will contact you. Once you confirm, you will be unable to send
                or receive new messages in your channel until your report has
                been resolved.
              </Text>
              <View
                style={{
                  alignItems: 'flex-end',
                  flexDirection: 'row-reverse',
                  marginTop: 36,
                }}
              >
                <PaperButton
                  labelStyle={{ color: 'white' }}
                  label="Confirm"
                  onPress={reportAbuseFetch}
                  mode="contained"
                />
                <PaperButton
                  label="Cancel"
                  onPress={modalDisplay}
                  mode="text"
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingBottom: 64,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalBodyText: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 26,
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
});

export default CardScreen;
