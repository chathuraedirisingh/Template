import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FetIcon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

import HomeScreen from './HomeScreen';
import BlankScreen from './BlankScreen';
import AlertScreen from './Tabs/AlertScreen';
import Settings from './Tabs/Settings';
import MessageScreen from './Tabs/MessageScreen';

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="home" size={27} color={tintColor} />
        )
      }
    },
    Alert: {
      screen: AlertScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FetIcon name="bell" size={27} color={tintColor} />
        )
      }
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MatIcon name="message-outline" size={27} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FetIcon name="settings" size={27} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.background
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  },

);

export default createAppContainer(bottomTabNavigator);