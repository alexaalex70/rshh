import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../config/colors';
import { StyleSheet, Text } from 'react-native';

import GeneratorScreen from '../screens/GeneratorScree/GeneratorScreen';
import CardScreen from '../screens/CardScreen/CardScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import ActionCentre from '../screens/ActionCentreScreen/ActionCentre';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ProfileDoneScreen from '../screens/ProfileDoneScreen/ProfileDoneScreen';
import ChannelInfo from '../screens/ChannelInfo/ChannelInfo';

import { AppBarProgress, AppBarHome } from '../components';
import HomepageScreen from '../screens/HomepageScreen/HomepageScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: colors.electricViolet,
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: 24,
  },
  headerTintColor: colors.white,
};

const QuestionStackNavigator = createStackNavigator();

export const QuestionNavigator = () => {
  return (
    <QuestionStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Log in"
    >
      <QuestionStackNavigator.Group>
        <QuestionStackNavigator.Screen
          name="Log in"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            header: () => null,
          })}
        />
        <QuestionStackNavigator.Screen
          name="Profile Done"
          component={ProfileDoneScreen}
          options={({ navigation }) => ({
            header: () => null,
          })}
        />
        <QuestionStackNavigator.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            title: '',
            header: () => (
              <AppBarProgress title="Questions" navigation={navigation} />
            ),
          })}
        />
        <QuestionStackNavigator.Screen
          name="Homepage"
          component={HomepageScreen}
          options={({ navigation }) => ({
            title: '',
            header: () => <AppBarHome navigation={navigation} />,
          })}
        />
      </QuestionStackNavigator.Group>
      <QuestionStackNavigator.Group>
        <QuestionStackNavigator.Screen
          name="Question Card"
          component={CardScreen}
          options={({ navigation }) => ({
            header: () => null,
          })}
        />
        <QuestionStackNavigator.Screen
          name="Channel Info"
          component={ChannelInfo}
          options={({ navigation }) => ({
            header: () => null,
          })}
        />
        <QuestionStackNavigator.Screen
          name="Action Centre"
          component={ActionCentre}
          options={() => ({
            headerTitle: () => <Text style={styles.logo}>roczen</Text>,
          })}
        />
      </QuestionStackNavigator.Group>
      <QuestionStackNavigator.Group>
        <QuestionStackNavigator.Screen
          name="Questions"
          component={GeneratorScreen}
          options={({ navigation }) => ({
            title: '',
            header: () => (
              <AppBarProgress title="Questions" navigation={navigation} />
            ),
          })}
        />
      </QuestionStackNavigator.Group>
    </QuestionStackNavigator.Navigator>
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
