import React, { FC, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors } from '../../config/colors';
import { fetchProfileByIDPId } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { updateNavigationInformation } from '../../store/actions/navigation/navigation';
import { RootState } from '../../store/reducers/rootReducer';
import { useFocusEffect } from '@react-navigation/native';
import { isValidRole } from './isValidRole';

const PleaseWaitScreen: FC<any> = ({ route, navigation }) => {
  const { subId } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subId) {
      dispatch(
        fetchProfileByIDPId({
          userId: subId,
          impersonate: false,
        })
      );
    }
  }, [subId, dispatch]);

  useEffect(() => {
    if (!profile) return;
    console.log('Profile:', profile);
    if (!isValidRole(profile.body)) {
      navigation.reset({ index: 0, routes: [{ name: 'Wrong Role' }] });
      return;
    }
    if (profile.status === 200 && profile.body.emailVerifiedAt) {
      dispatch(updateNavigationInformation({ navigationId: 'Homepage' }));
      navigation.reset({ index: 0, routes: [{ name: 'Homepage' }] });
    }
  }, [profile, dispatch, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (!profile || !isValidRole(profile.body)) return;
      const goToProfile = () => {
        navigation.navigate('Profile');
      };

      if (profile.status !== 200 || !profile.body?.emailVerifiedAt) {
        console.log(
          'Navigating to Profile Screen. Profile object: ',
          JSON.stringify(profile, null, 2)
        );
        goToProfile();
      } else {
        // TODO: proper work with fetch timeout
        const timeout = setTimeout(() => {
          goToProfile();
        }, 5000);

        return () => {
          clearTimeout(timeout);
        };
      }
    }, [profile, navigation])
  );

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 5 }}
        >
          <Avatar.Icon
            icon="check"
            size={150}
            color={colors.funGreen}
            style={{ backgroundColor: colors.white }}
          />
          <Text style={styles.status}>Please wait...</Text>
          <Text style={styles.message}>We are just fetching your details</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  status: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.black,
    letterSpacing: 0.18,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    letterSpacing: 0.5,
    marginTop: 12,
    paddingHorizontal: '15%',
    display: 'flex',
    textAlign: 'center',
  },
});
export default PleaseWaitScreen;
