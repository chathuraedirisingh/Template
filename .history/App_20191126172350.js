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
    Scan: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Scan',
        drawerIcon: ({ tintColor }) => <Icon name="camera" size={16} color={tintColor} />
      }
    },
    DigitalApplication: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Digital Application',
        drawerIcon: ({ tintColor }) => <Icon name="monitor" size={16} color={tintColor} />
      }
    },
    DigitalApplication: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Digital Application',
        drawerIcon: ({ tintColor }) => <Icon name="monitor" size={16} color={tintColor} />
      }
    },
    CreditInquiry: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Credit Inquiry',
        drawerIcon: ({ tintColor }) => <Icon name="tag" size={16} color={tintColor} />
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
        marginTop: 10,
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