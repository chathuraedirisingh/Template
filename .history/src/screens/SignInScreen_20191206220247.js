import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions 
} from 'react-native';


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username   : '',
      password: '',
      formValid:false,
      validUsername: false,
      validPassword: false,
      loadingVisible: false
    }
  }

  handleButtonPress = () => {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      const { username, password } = this.state;
      if (username, password) {
        this.setState({ formValid: true, loadingVisible: false });
        this.props.navigation.navigate('Home')
      } else {
          Alert.alert("Sign In", "Please enter your username & password.!");
      }
    },200)
  }

  handlePasswordChange = (password) => {
    const {validPassword } = this.state
    this.setState({ password });
    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    }
    else if (password <= 4) {
      this.setState({validPassword: false });
    }
  }

  handleEmailChange = (username) => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validUsername } = this.state;
    this.setState({ username });
    // Alert.alert("Alert", "Button username "+username);
    console.log("Alert", "Button password "+username);
    if (!validUsername) {
      if (emailCheckRegex.test(username)) {
        this.setState({ validUsername: true });
      }
    }
    else if (!emailCheckRegex.test(username)) {
      this.setState({ validUsername: false });
    }
  }

  render(){
    return (
      // <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <View style={styles.Logo}>
        <ImageBackground source={require('../../assets/image.png')} 
          style={{ width: '100%',padding: 12, paddingTop: 50 , marginTop:-50}}
          >
        </ImageBackground>
        </View>
        <View style={styles.inputContainer}> 
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              // defaultValue="test@gmail.com"
              underlineColorAndroid='transparent'
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              // showCheckmark={this.state.validEmail}
              autoFocus
              />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              // defaultValue="test"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              // onChangeText={(username) => this.setState({email})}/>
              />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
          onPress={() => this.handleButtonPress()} underlayColor='#3286C9'>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableHighlight>
        {/* container end */}
      </View>
      // </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2f96f3',
    backgroundColor: '#f1faff',
  },
  Logo:{
    width:Dimensions.get('window').width - 160,
    height:150,
    marginTop:100
  },
  inputContainer: {
      borderBottomColor: '#C6C9C9',
      backgroundColor: '#E0ECF2',
      borderRadius:3,
      borderBottomWidth: 1,
      width:Dimensions.get('window').width - 100,
      height:50,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs: {
    borderColor: 'red',
    height: 50,
    marginLeft: 16,
    flex: 1,
    // textAlign : 'center'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:80,
    width:Dimensions.get('window').width - 100,
    borderRadius:5,
  },
  loginButton: {
    backgroundColor: "#3da3f5",
    borderRadius:3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},

  },
  loginText: {
    color: '#f4f4f4',
  }
});

export default SignIn;