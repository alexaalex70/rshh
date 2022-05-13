import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { Avatar, Divider, Badge } from 'react-native-paper';
import TimeAgo from 'javascript-time-ago';
import { REACT_APP_CHANNEL_API } from '@env';
import Modal from 'react-native-modal';

import { RootState } from '../../store/reducers/rootReducer';
import { UserInfoState } from '../../store/models/types/userTypes';
import { ProfileState } from '../../store/models/types/profileTypes';
import { useSelector } from 'react-redux';

import { PaperButton, AppBar } from '../../components';

import { colors } from '../../config/colors';
import { RHPfetch, RHPResponse } from '../../config/apiWrapper';

const ChannelStatus: { [key: string]: string } = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
};

const ProfileEligibility: { [key: string]: string } = {
  ELIGIBLE: 'Eligible',
  INELIGIBLE: 'Ineligible',
  PENDING: 'Pending',
};

const ChannelTypes: { [key: string]: string } = {
  CLINICIAN_MEMBER: 'primaryClinician',
  MENTOR_MEMBER: 'primaryMentor',
};

const ChannelInfo: FC<any> = ({ route, navigation }) => {
  const [channelData, setChannelData] = useState<any>(undefined);
  const [loader, setLoader] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const { impersonate, profile } = useSelector(
    (state: RootState) => state.profile
  ) as ProfileState;

  const { token } = useSelector(
    (state: RootState) => state.user
  ) as UserInfoState;

  const timeAgo = new TimeAgo('en-GB');
  const { channelId } = route.params;

  useEffect(() => {
    RHPfetch(`${REACT_APP_CHANNEL_API}/channel/${channelId}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: impersonate ? `Profile ${token}` : `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((res: any) => {
        setChannelData(res.body);
      });
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (channelData !== undefined) {
      setLoader(true);
    }
  }, [channelData]);

  const handleAvatarName = () => {
    const key = ChannelTypes[channelData.channelType];
    console.log(
      'Channel data: ',
      key,
      channelData[key],
      typeof channelData[key]
    );

    if (!channelData[key]) return 'N/A';
    if (channelData[key].avatarInitials) {
      return channelData[key].avatarInitials;
    } else {
      // Use proper avatar with picture
      const name = channelData[key].displayName.split(' ');
      return name[0][0] + name[1][0];
    }
  };

  const handleUserName = () => {
    const key = ChannelTypes[channelData.channelType];

    console.log(
      'Channel data: ',
      key,
      channelData[key],
      typeof channelData[key]
    );
    if (!channelData[key]) return 'N/A';

    return channelData[key].displayName;
  };

  const handleInfo = () => {
    // @ts-ignore
    // @ts-ignore
    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionHeadline}>
            Primary{' '}
            {channelData.channelType.split('_')[0]
              ? capitalizeFirstLetter(
                  channelData.channelType.split('_')[0].toLowerCase()
                )
              : ':('}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 32,
            }}
          >
            <Avatar.Text
              style={{ backgroundColor: colors.blueChalk }}
              size={96}
              label={handleAvatarName()}
            />
            <Text style={styles.name}>{handleUserName()}</Text>
            {/* TODO add condition to display button only if we have relevant Primary Clinician / Primart Mentor
                Untill we don't have profiles this should be commented out
            <PaperButton
              label="See full profile"
              onPress={() => console.log('full profile')}
              style={styles.customButton}
              mode="outlined"
            /> */}
          </View>
        </View>
        <Divider />
        <View style={styles.section}>
          <Text style={styles.sectionHeadline}>Details</Text>
          <View style={[styles.row, { marginTop: 16 }]}>
            <Text>Channel age</Text>
            <Text style={styles.caption}>
              {timeAgo.format(new Date(channelData.createdAt), 'mini')}
            </Text>
          </View>
          <View style={[styles.row, { marginTop: 22 }]}>
            <Text>Channel status</Text>
            <Badge style={styles.customBadge}>
              {ChannelStatus[channelData.state]}
            </Badge>
          </View>
          {channelData.channelType.split('_')[0] === 'CLINICIAN' ? (
            <View style={[styles.row, { marginTop: 22 }]}>
              <Text>Eligibility status</Text>
              <Badge style={styles.customBadge}>
                {ProfileEligibility[profile.body.eligibility]}
              </Badge>
            </View>
          ) : null}
        </View>
        <Divider />
        <View style={styles.section}>
          <Text style={styles.sectionHeadline}>Support</Text>
          <PaperButton
            label="Get help and support"
            onPress={() => Linking.openURL('https://roczen.com/faqs')}
            style={[styles.customButton, { marginTop: 16 }]}
            mode="outlined"
            icon="help-circle"
          />
          <PaperButton
            label="Report an issue"
            onPress={modalDisplay}
            style={[styles.customButton, { marginTop: 16 }]}
            mode="outlined"
            icon="flag"
          />
        </View>
      </>
    );
  };

  const modalDisplay = () => setVisibleModal(!visibleModal);

  return (
    <>
      <AppBar
        title="Channel Info"
        navigationIcon="arrow-left"
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Modal isVisible={visibleModal}>
            <View style={styles.modalStyle}>
              <Text style={styles.modalTitle}>Report an issue</Text>
              <Text style={styles.modalBodyText}>
                If you need to report an issue please email us at{' '}
                <Text
                  onPress={() =>
                    Linking.openURL('mailto:support.uk@roczen.com')
                  }
                  style={styles.textLink}
                >
                  help@roczen.com
                </Text>
              </Text>
              <View />
              <View style={{ alignItems: 'flex-end' }}>
                <PaperButton
                  style={{ width: 100 }}
                  label="Close"
                  onPress={modalDisplay}
                  mode="text"
                />
              </View>
            </View>
          </Modal>
          {loader && handleInfo()}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingBottom: 16,
  },
  name: {
    fontWeight: '400',
    fontSize: 15,
    marginVertical: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionHeadline: {
    fontWeight: '500',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.38)',
  },
  customBadge: {
    backgroundColor: 'white',
    borderColor: colors.gray,
    borderWidth: 0.5,
  },
  customButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.electricViolet,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBodyText: {
    fontSize: 16,
    marginTop: 12,
  },
  textLink: {
    color: colors.electricViolet,
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
});

export default ChannelInfo;
