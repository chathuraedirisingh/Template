import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import firebase from '../../configs/firebase';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class ViewDealerScreen extends Component {
  constructor(props) {
    super(props);

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      phone: '',
      entity: '',
      orientation: isPortrait() ? 'portrait' : 'landscape',
      data: [],
      submitting: false,
      error: false,
      sending: false,
    };
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
    };
  };

  _handleVerify() {
    console.log('hi');
    var str = new String('6179528736');
    console.log(+'US ' + str.length);

    let phone = this.state.phone;
    let is_valid = /^\d+$/.test(phone);
    // var us = '6179528736';

    if (is_valid) {
      if (phone.length <= 11) {
        this._sendSMS(phone);
        this.setState({sending: true});
      } else if (this.formatPhoneNumber(phone) == true) {
        this._sendSMS(phone);
        this.setState({sending: true});
      } else {
        alert("Invalid Mobile number (hint: don't add + ) ");
      }
    } else {
      alert('Hint: 9477xxxxxxx');
    }
  }

  formatPhoneNumber(phoneNumberString) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumberString.value.match(phoneno)) {
      return true;
    } else {
      // alert("message");
      return false;
    }
  }

  _sendSMS(phone) {
    console.log(this.state.sending);
    let data = {
      method: 'POST',
      body: JSON.stringify({
        to: '+' + phone,
        body: 'See your profile at https://bit.ly/35qLYy5',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch('https://twilio-test-starter.herokuapp.com/api/send', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('response object:', responseJson);
        if (responseJson.success === true) {
          this.setState({sending: false});
          alert(
            'Verification link sent successfully, firebase state verify updated',
          );
          this.update_dealer_verified();
        } else {
          this.setState({sending: false});
          alert('Verification link sent failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_dealer_verified() {
    firebase
      .database()
      .ref('Dealers/' + this.state.entity)
      .update({verified: 'true'})
      .then(data => {
        console.log(data);
        // let newState = {
        //   authenticated: true,
        // };
        // this.setState(newState);
        // alert('dealer verify successfully');
      })
      .catch(error => {
        console.log(error);
        //error callback
        // alert('dealer adding failed');
        // let newState = {
        //   authenticated: false,
        // };
        // this.setState(newState);
      });
  }

  render() {
    const {navigation} = this.props;
    const user = navigation.getParam('user', {});
    this.state.entity = user.entity;
    console.log(this.state);

    if (this.state.sending) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

    if (this.state.orientation === 'portrait') {
      return (
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor={colors.BG_STATUS_BAR}
            barStyle="light-content"
          />
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.headContainer}>
              <Icon
                style={styles.drawerIcon}
                name="bars"
                size={25}
                color="#f9f9f9"
                onPress={this.props.navigation.openDrawer}
              />
            </View>
          </SafeAreaView>
          <DismissKeyboard>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              behavior="padding"
              keyboardVerticalOffset={150}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: -255,
                }}>
                <Avatar
                  rounded
                  size="xlarge"
                  onPress={() => console.log('Works!')}
                  source={{uri: user.face_image}}
                />
                <View style={{opacity: 0.6, flex: 0, alignItems: 'center'}}>
                  <Text>
                    {user.first_name} {user.last_name}
                  </Text>
                  <Text>
                    {user.date_of_birth}
                    {/* {Moment(user.date_of_birth).format('DD/MM/YYYY')} */}
                  </Text>
                  <Text>{user.address}</Text>
                  {/* <Text>{`${this.state.data.location.city}, ${this.state.data.location.state}, ${this.state.data.location.country}`}</Text> */}
                </View>
                <View
                  style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    placeholder=" Enter mobile number (required)"
                    placeholderTextColor={colors.MD_GRAY}
                    returnKeyType="next"
                    containerStyle={{width: 300, marginTop: 22, paddingTop: 8}}
                    ref={el => {
                      this.phone = el;
                    }}
                    onChangeText={phone => this.setState({phone})}
                    value={this.state.phone}
                  />
                  <TouchableOpacity
                    style={{marginTop: 22, paddingTop: 8}}
                    onPress={() => this._handleVerify()}>
                    <Icon name="phone" size={33} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    marginTop: -60,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('AddConsumer');
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Profile
                    </Text>
                    <Icon
                      name="folder-open"
                      size={40}
                      color={colors.SKY_BLUE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('HardPull', {
                        data: user,
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Hard Pull
                    </Text>
                    <Icon name="users" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 2
                    </Text>
                    <Icon name="signal" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    // flex: 1,
                    marginTop: -140,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 3
                    </Text>

                    <Icon name="briefcase" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 4
                    </Text>
                    <Icon name="line-chart" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 5
                    </Text>
                    <Icon name="search" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </View>
      );
    }
    // ========================================
    else {
      return (
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor={colors.BG_STATUS_BAR}
            barStyle="light-content"
          />
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.headContainer}>
              <Icon
                style={styles.drawerIcon}
                name="bars"
                size={25}
                color="#f9f9f9"
                onPress={this.props.navigation.openDrawer}
              />
            </View>
          </SafeAreaView>

          <DismissKeyboard>
            <KeyboardAvoidingView
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}
              behavior="padding"
              keyboardVerticalOffset={150}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: -100,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    margin: 10,
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Avatar
                      rounded
                      size="large"
                      onPress={() => console.log('Works!')}
                      source={{uri: user.face_image}}
                    />
                  </View>
                  <View
                    style={{
                      opacity: 0.6,
                      flex: 0,
                      alignItems: 'flex-start',
                      marginRight: 10,
                    }}>
                    <Text>
                      {user.first_name} {user.last_name}
                    </Text>
                    <Text>
                      {user.date_of_birth}
                      {/* {Moment(user.date_of_birth).format('DD/MM/YYYY')} */}
                    </Text>
                    <Text>{user.address}</Text>
                    {/* // <Text>{`${this.state.data.location.city}, ${this.state.data.location.state}, ${this.state.data.location.country}`}</Text> */}
                  </View>
                </View>
                <View style={{ flexDirection:'row',marginTop:5}}>
                  <Input
                    placeholder=" Enter mobile number (required)"
                    placeholderTextColor={colors.MD_GRAY}
                    keyboardType={'numeric'}
                    returnKeyType="next"
                    containerStyle={{width: 320}}
                    ref={el => {
                      this.phone = el;
                    }}
                    onChangeText={phone => this.setState({phone})}
                    value={this.state.phone}
                  />

                  <TouchableOpacity
                    style={{marginTop: 5, paddingTop: 8}}
                    onPress={() => this._handleVerify()}>
                    <Icon name="phone" size={33} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* prof image end */}

              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                <View
                  style={{
                    marginTop: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('AddConsumer');
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Profile
                    </Text>
                    <Icon
                      name="folder-open"
                      size={40}
                      color={colors.SKY_BLUE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('HardPull', {
                        data: user,
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Hard Pull
                    </Text>
                    <Icon name="users" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 2
                    </Text>
                    <Icon name="signal" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    // flex: 1,
                    marginTop: -200,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 3
                    </Text>

                    <Icon name="briefcase" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 4
                    </Text>
                    <Icon name="line-chart" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 6,
                      margin: 5,
                      borderColor: 'skyblue',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'skyblue'}}>
                      Action 5
                    </Text>
                    <Icon name="search" size={40} color={colors.SKY_BLUE} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    backgroundColor: colors.BG_MAIN_COVER,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  searchIcon: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  drawerIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
