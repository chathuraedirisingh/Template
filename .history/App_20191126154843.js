import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import Sidebar from './src/components/Sidebar';


const DrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Message: { screen: MessageScreen }
},
{
  contentComponent:props=><Sidebar {...props}/>
}
);

const App = createAppContainer(DrawerNavigator);

export default App;