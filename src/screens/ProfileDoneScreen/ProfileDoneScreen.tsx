import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors } from '../../config/colors';
import Button from '../../components/Atoms/PaperButton/PaperButton';
import { fetchProfileById } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { updateNavigationInformation } from '../../store/actions/navigation/navigation';

const ProfileDoneScreen: FC<any> = ({ route, navigation }) => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingScreen) {
      setTimeout(() => {
        setLoadingScreen(false);
      }, 3000);
    }
  }, [loadingScreen]);

  return (
    <>
      {loadingScreen ? (
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
            <Text style={styles.status}>Getting you set up</Text>
          </View>
        </SafeAreaView>
      ) : (
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
            <Text style={styles.status}>Verified!</Text>
            <Text style={styles.message}>
              Your email has been verified. You may now begin to explore the
              Roczen app
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              mode="outlined"
              onPress={() => {
                console.log('Route params:', route.params);
                dispatch(
                  updateNavigationInformation({ navigationId: 'Homepage' })
                );
                dispatch(
                  fetchProfileById({
                    userId: route.params.userId.body.id,
                    impersonate: false,
                  })
                );
                navigation.reset({ index: 0, routes: [{ name: 'Homepage' }] });
              }}
              style={{ backgroundColor: colors.blueRibbon, width: '80%' }}
              labelStyle={{ color: colors.white }}
              label="LET'S GO"
            />
          </View>
        </SafeAreaView>
      )}
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
export default ProfileDoneScreen;
