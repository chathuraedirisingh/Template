import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import SideBar from './src/components/SideBar';
// import Icon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/FontAwesome'
import ScanIDScreen from './src/screens/ScanIDScreen';

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
      screen: ScanIDScreen,
      navigationOptions: {
        title: 'ID Scan',
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
    PreQualificationage: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Pre-Qualification',
        drawerIcon: ({ tintColor }) => <Icon name="tag" size={16} color={tintColor} />
      }
    },
    complianceSolutions: {
      screen: ProfileScreen,
      navigationOptions: {
        title:'Compliance Solutions',
        drawerIcon: ({ tintColor }) => <Icon name="tag" size={16} color={tintColor} />
      }
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.80,
    drawerBackgroundColor:'#fefefe',
    drawerType:'front',
    hideStatusBar: true,
    contentOptions: {
      activeBackgroundColor: '#3da3f5',
      activeTintColor: '#f4f4f4',
      itemsContainerStyle: {
        marginTop: 0,
        marginHorizontal: 0,
      },
      itemStyle: {
        borderRadius: 0
      }
    }
  }
);

const App = createAppContainer(DrawerNavigator);

export default App;

// const App = () => {
//   return (
//       <SignInScreen/>
//   );
// };

// export default App;
