import React, { Component } from 'react'
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
        title:'Home',
        drawerIcon:({tintColor})=><Icon name="home" size={16} color={tintColor}/>
      }
    },
    Profile: { screen: ProfileScreen },
    Message: { screen: MessageScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const App = createAppContainer(DrawerNavigator);

export default App;