import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import SideBar from './src/components/SideBar';
import Icon from 'react-native-vector-icons/dist/Feather';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        drawerIcon: ({ tintColor }) => <Icon name="home" size={16} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        drawerIcon: ({ tintColor }) => <Icon name="user" size={16} color={tintColor} />
      }
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        title: 'Messages',
        drawerIcon: ({ tintColor }) => <Icon name="message-square" size={16} color={tintColor} />
      }
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.85,
    hideStatusBar: true,

    contentOptions: {
      activeBackgroundColor: '#1c5dc9',
      activeTintColor: '#FFF',
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,

      },
      itemStyle: {
        borderRadius: 4
      }
    }

  }
);

const App = createAppContainer(DrawerNavigator);

export default App;