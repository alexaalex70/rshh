import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import HomepageScreen from '../screens/HomepageScreen/HomepageScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import CardScreen from '../screens/CardScreen/CardScreen';
import ChannelInfo from '../screens/ChannelInfo/ChannelInfo';
import GeneratorScreen from '../screens/GeneratorScree/GeneratorScreen';
import { AppBarHome, AppBarProgress } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import { updateUserInformation } from '../store/actions';
import { StyleSheet, Text, View } from 'react-native';
import ProfileDoneScreen from '../screens/ProfileDoneScreen/ProfileDoneScreen';
import ActionCentre from '../screens/ActionCentreScreen/ActionCentre';
import { colors } from '../config/colors';
import PleaseWaitScreen from '../screens/PleaseWaitScreen/PleaseWaitScreen';
import { WrongRoleScreen } from '../screens/WrongRoleScreen/WrongRoleScreen';

const StackAuth = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackAuth.Screen name="Welcome" component={WelcomeScreen} />
    </StackAuth.Navigator>
  );
};

const Stack = createNativeStackNavigator();
type AppNavigatorProps = {
  userInfo: any;
};
const AppNavigator: React.FC<AppNavigatorProps> = ({ userInfo }) => {
  const { isLogged } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('App navigator userInfo:', userInfo);
    if (userInfo) dispatch(updateUserInformation(userInfo));
  }, [dispatch, userInfo]);

  if (isLogged === null)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PleaseWait">
          {!isLogged ? (
            <Stack.Screen
              name="SignIn"
              component={AuthStack}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Homepage"
                component={HomepageScreen}
                options={({ navigation }) => ({
                  header: () => <AppBarHome navigation={navigation} />,
                })}
              />
              <Stack.Screen
                name="ActionCentre"
                component={ActionCentre}
                options={() => ({
                  header: () => null,
                })}
              />
              <Stack.Screen
                name="Question Card"
                component={CardScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Channel Info"
                component={ChannelInfo}
                options={() => ({
                  header: () => null,
                })}
              />
              <Stack.Screen
                name="Questions"
                component={GeneratorScreen}
                options={({ navigation }) => ({
                  title: '',
                  header: () => (
                    <AppBarProgress title="Questions" navigation={navigation} />
                  ),
                })}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => ({
                  header: () => (
                    <AppBarProgress title="Questions" navigation={navigation} />
                  ),
                })}
              />
              <Stack.Screen
                name="PleaseWait"
                component={PleaseWaitScreen}
                options={({ navigation }) => ({
                  header: () => (
                    <AppBarProgress
                      title="Please Wait"
                      navigation={navigation}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="Wrong Role"
                component={WrongRoleScreen}
                options={() => ({
                  header: () => null,
                })}
              />
              {/*<Stack.Screen*/}
              {/*  name="Impersonation"*/}
              {/*  component={ImpersonationScreen}*/}
              {/*  options={{*/}
              {/*    headerShown: false,*/}
              {/*  }}*/}
              {/*/>*/}
              <Stack.Screen
                name="Profile Done"
                component={ProfileDoneScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
  logo: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
});

export default AppNavigator;
