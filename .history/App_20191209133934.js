import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileScreen from './src/screens/ProfileScreen';
import SideBar from './src/components/SideBar';
// import Icon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/FontAwesome'
import ScanIDScreen from './src/screens/ScanIDScreen';
import SignInScreen from './src/screens/SignInScreen';
import TabNavigator from './src/screens/TabNavigator';
import BlankScreen from './src/screens/BlankScreen';
import ShowDetailsScreen from './src/screens/ShowDetailsScreen';
import DealerListScreen from './src/screens/DealerListScreen';
import ViewDealerScreen from './src/screens/ViewDealerScreen';
import HardPullScreen from './src/screens/HardPullScreen';
import AddConsumerScreen from './src/screens/AddConsumerScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: 'Sign In',
        drawerIcon: ({ tintColor }) => <Icon name="user" size={16} color={tintColor} />
      }
    },
    HardPull: {
      screen: HardPullScreen,
      navigationOptions: {
        title: 'Hard Pull',
        drawerIcon: ({ tintColor }) => <Icon name="check-circle-o" size={16} color={tintColor} />
      }
    },
    Home: {
      screen: TabNavigator,
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
    AddConsumer:{
      screen: AddConsumerScreen,
      navigationOptions: {
        title: 'Customer List',
        drawerIcon: ({ tintColor }) => <Icon name="camera" size={16} color={tintColor} />
      }
    },
    DealerList:{
      screen: DealerListScreen,
      navigationOptions: {
        title: 'Customer List',
        drawerIcon: ({ tintColor }) => <Icon name="camera" size={16} color={tintColor} />
      }
    },
    DigitalApplication: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Digital Application',
        drawerIcon: ({ tintColor }) => <Icon name="tv" size={16} color={tintColor} />
      }
    },
    CreditInquiry: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Credit Inquiry',
        drawerIcon: ({ tintColor }) => <Icon name="credit-card" size={16} color={tintColor} />
      }
    },
    PreQualificationage: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Pre-Qualification',
        drawerIcon: ({ tintColor }) => <Icon name="clipboard" size={16} color={tintColor} />
      }
    },
    complianceSolutions: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Compliance Solutions',
        drawerIcon: ({ tintColor }) => <Icon name="film" size={16} color={tintColor} />
      }
    },

    SyntheticFraud: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Synthetic Fraud',
        drawerIcon: ({ tintColor }) => <Icon name="snapchat-ghost" size={16} color={tintColor} />
      }
    },
    Transactions: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Transactions',
        drawerIcon: ({ tintColor }) => <Icon name="cc-mastercard" size={16} color={tintColor} />
      }
    },
    ManageAlerts: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Manage Alerts',
        drawerIcon: ({ tintColor }) => <Icon name="bell" size={16} color={tintColor} />
      }
    },
    AccountSettings: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Account Settings',
        drawerIcon: ({ tintColor }) => <Icon name="cog" size={16} color={tintColor} />
      }
    },
    PushDataDTTR1: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Push Data to DT/TR1',
        drawerIcon: ({ tintColor }) => <Icon name="tag" size={16} color={tintColor} />
      }
    },
    DMSSync: {
      screen: BlankScreen,
      navigationOptions: {
        title:'DMS Sync',
        drawerIcon: ({ tintColor }) => <Icon name="random" size={16} color={tintColor} />
      }
    },

    Show:{
      screen: ShowDetailsScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    },
    ViewDealer:{
      screen: ViewDealerScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    }
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

// const App = () => {
//   return (
//       <App/>
//   );
// };

export default App;
