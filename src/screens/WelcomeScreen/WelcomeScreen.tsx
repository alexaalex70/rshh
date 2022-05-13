import React, { FC, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { PaperButton } from '../../components';
import { colors } from '../../config/colors';

import { Auth, Hub } from 'aws-amplify';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUserInformation } from '../../store/actions';

const image1 = require('../../assets/images/image.png');
const image2 = require('../../assets/images/image2.png');
const image3 = require('../../assets/images/image3.png');

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width / 1.2;

const DATA = [
  {
    description:
      'Get access to dedicated channels for chatting one-on-one with your clinician and mentor. Drop in any time you have questions or just want to check in.',
    key: 1,
  },
  {
    description:
      'Get notified of all new activity you have across all your channels, and keep track of your next steps.',
    key: 2,
  },
  {
    description:
      'Check-in easily by answering questions simply and on your terms in-app. No more queuing, being on hold, or waiting around the doctor’s office all day.',
    key: 3,
  },
];

const Indicator = ({ scrollX }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
        });

        return (
          <Animated.View
            key={`indicator - ${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: colors.black,
              marginTop: 30,
              marginHorizontal: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const WelcomeScreen: FC<any> = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // const handleSignUp = () => {
  //   dispatch(
  //     fetchProfileById({
  //       userId: '01ekstbcw80000000000000000',
  //     })
  //   );
  //   navigation.navigate("Homepage");
  // };
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Hub.listen('auth', ({ payload: { event, data } }) => {
        console.log(event);
        switch (event) {
          case 'signIn': {
            getUser().then((userData) => {
              const decodeToken: any = jwt_decode(
                userData.signInUserSession.accessToken.jwtToken
              );
              dispatch(
                updateUserInformation({
                  isLoading: false,
                  isLogged: true,
                  id: decodeToken.client_id,
                  subId: decodeToken.sub,
                  idpKey: decodeToken.sub,
                  phoneNumber:
                    userData.signInUserSession.idToken.payload.phone_number,
                  token: userData.signInUserSession.accessToken.jwtToken,
                  refreshToken: userData.signInUserSession.refreshToken.token,
                })
              );
            });
            break;
          }
          case 'cognitoHostedUI': {
            // getUser().then(userData => setUser(userData));
            getUser().then((userData) => {
              const decodeToken: any = jwt_decode(
                userData.signInUserSession.accessToken.jwtToken
              );
              dispatch(
                updateUserInformation({
                  isLoading: false,
                  isLogged: true,
                  id: decodeToken.client_id,
                  subId: decodeToken.sub,
                  idpKey: decodeToken.sub,
                  phoneNumber:
                    userData.signInUserSession.idToken.payload.phone_number,
                  token: userData.signInUserSession.accessToken.jwtToken,
                  refreshToken: userData.signInUserSession.refreshToken.token,
                })
              );
            });
            break;
          }
          case 'signOut': {
            dispatch(
              updateUserInformation({
                isLogged: false,
                isLoading: false,
                id: '',
                subId: '',
                idpKey: '',
                phoneNumber: '',
                token: '',
                refreshToken: '',
              })
            );
            break;
          }
          case 'signIn_failure':
          case 'cognitoHostedUI_failure':
            console.log('Sign in failure', data);
            break;
        }
      });

      // getUser().then(userData => setUser(userData));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  };

  // useEffect(() => {
  //   if(user) navigation.navigate('Home');
  // }, [user])

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>roczen</Text>
        <View style={styles.carouselWrapper}>
          <Animated.FlatList
            data={DATA}
            keyExtractor={(item: any) => item.key}
            contentContainerStyle={{ paddingBottom: 20 }}
            snapToInterval={ITEM_WIDTH}
            horizontal
            bounces={false}
            pagingEnabled
            decelerationRate="fast"
            scrollEventThrottle={32}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              let img;
              if (index === 0) img = image1;
              else if (index === 1) img = image2;
              else img = image3;

              return (
                <View
                  style={{
                    width: ITEM_WIDTH,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={img}
                    style={{
                      width: '100%',
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={styles.description}>{item.description}</Text>
                  <Indicator scrollX={scrollX} />
                </View>
              );
            }}
          />
        </View>
        <View style={styles.footerWrapper}>
          {/* <PaperButton
              label="Sign Up"
              mode="contained"
              onPress={() => Auth.signOut()}
              labelStyle={{color: colors.white }}
              style={{
                width: Dimensions.get('window').width * 0.86
              }}
            /> */}
          <PaperButton
            label="Sign In/Up"
            onPress={() => Auth.federatedSignIn()}
            mode="contained"
            labelStyle={{ color: colors.white }}
            style={{
              backgroundColor: colors.blueRibbon,
              borderWidth: 1,
              marginVertical: Dimensions.get('window').height * 0.02,
              width: Dimensions.get('window').width * 0.86,
            }}
          />
          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text
              style={styles.linkStyle}
              onPress={() =>
                Linking.openURL('https://www.roczen.com/terms-of-service')
              }
            >
              Terms
            </Text>{' '}
            &{' '}
            <Text
              style={styles.linkStyle}
              onPress={() =>
                Linking.openURL('https://www.roczen.com/privacy-policy')
              }
            >
              Privacy policy
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.08,
    alignItems: 'center',
    backgroundColor: colors.vistaWhite,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  title: {
    color: colors.black,
    fontSize: Dimensions.get('window').width < 350 ? 16 : 20,
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
  description: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 34,
    letterSpacing: 0.5,
    marginTop: '4%',
  },
  footerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: ITEM_WIDTH,
    overflow: 'hidden',
  },
  terms: {
    color: colors.black,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  linkStyle: {
    color: colors.blueRibbon,
  },
});

export default WelcomeScreen;
