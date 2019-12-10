import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators'

import AsyncStorage from '@react-native-community/async-storage';

import * as BlinkIDReactNative from 'blinkid-react-native';

const licenseKey = Platform.select({
  ios:
    'sRwAAAEIY29tLmNvcmWlB9YEexqAQ4yo7SEaIEvpwO8X99s/6zsUOyeYGPKr1qEW2xW7FfowIsvkQCzkxvC3B9uZtWxur8RkeH24LZCr28eLMqQ5Wsd6EFp40CJyA2QwrJI5BzJw4af3np5v9TXsLvNYOfqaFeVVY2SFgZCDaoWar+bPWDGFd/Yn9lUF7PGeFHaC0/TuI2isjjTLUs479yBqCjujJo6jZXPAfBk778xCnh0QmBsefvMAtMk8Ad/1U8sPosrRtOMiYRtyEFBNjj07izbEKQ==',
  android:
    'sRwAAAAIY29tLmNvcmWSfF3q4eDAnywqpYl9/PfX5x8XjMvbJakkdGhRhGFKID3QoVvb34wZy3vXC92swTvLA0kv0s0qhAcrSVkL1kwZAKzZcaN+d5aqmJUpPlEgzdJB/ceM6Uz+wjC5E0Boe9nBR5FGWbmMEWKFbroN3ovXp3DUhLQEhVPrJpsqvOn2I4b/fSGQB0T7CeaZ7XbZ1i54D6NNU8dy1RlioWeesL741zc2nkEgxEwe+7Jz5aKEqknzWNvnKd20dg9bzL8qn15cnS3NkIOA4Q==',
});

export default class HomeScreen extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       name : '',
  //     }
  //   }

  constructor(props) {
    super(props);
    this.state = {
      status: true,
      scaning: false,
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: '',
      licenseKeyErrorMessage: '',
    };
  }
  // handleButtonPress = () => {
  //     Alert.alert("Scaning ", "We are processing your request");
  //     this.props.navigation.navigate('Scan');
  // }

  componentDidMount(){
    // try {
    //   const value = await AsyncStorage.getItem('@username')
    //   if(value !== null) {
    //     // value previously stored
    //   }
    // } catch(e) {
    //   // error reading value
    // }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@username')
      if(value !== null) {
        console.log(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  async scan() {
    try {
      var blinkIdRecognizer = new BlinkIDReactNative.BlinkIdRecognizer();
      blinkIdRecognizer.returnFullDocumentImage = true;
      blinkIdRecognizer.returnFaceImage = true;

      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
        new BlinkIDReactNative.BlinkIdOverlaySettings(),
        new BlinkIDReactNative.RecognizerCollection([
          blinkIdRecognizer /*, mrtdSuccessFrameGrabber*/,
        ]),
        licenseKey,
      );

      if (scanningResults) {
        let newState = {
          showImageDocument: false,
          resultImageDocument: '',
          showImageFace: false,
          resultImageFace: '',
          results: '',
          showSuccessFrame: false,
          successFrame: '',
        };

        for (let i = 0; i < scanningResults.length; ++i) {
          let localState = this.handleResult(scanningResults[i]);
          newState.showImageDocument =
            newState.showImageDocument || localState.showImageDocument;
          if (localState.resultImageDocument) {
            newState.resultImageDocument = localState.resultImageDocument;
          }
          newState.showImageFace =
            newState.showImageFace || localState.showImageFace;
          if (localState.resultImageFace) {
            newState.resultImageFace = localState.resultImageFace;
          }
          newState.results += localState.results;
          newState.showSuccessFrame =
            newState.showSuccessFrame || localState.showSuccessFrame;
          if (localState.successFrame) {
            newState.successFrame = localState.successFrame;
          }
        }
        newState.results += '\n';
        this.setState(newState);
      }
    } catch (error) {
      console.log(error);
      this.setState({
        showImageDocument: false,
        resultImageDocument: '',
        showImageFace: false,
        resultImageFace: '',
        results: 'Scanning has been cancelled',
        showSuccessFrame: false,
        successFrame: '',
      });
    }
  }

  handleResult(result) {
    var localState = {
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      results: '',
      showSuccessFrame: false,
      successFrame: '',
    };

    if (result instanceof BlinkIDReactNative.BlinkIdRecognizerResult) {
      let blinkIdResult = result;
      this.props.navigation.navigate('Show', {passedData: blinkIdResult});
    }
    return localState;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#2678c2" barStyle="light-content" />

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.searchHead}>
              <TouchableOpacity style={{alignItems: 'flex-start', margin: 20}}>
                <Icon
                  name="bars"
                  size={25}
                  color="#f9f9f9"
                  onPress={this.props.navigation.openDrawer}
                />
                <TextInput
                  placeholder="Search Here"
                  style={styles.search}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#d5e6ee"
                />
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={22}
                  color="#f9f9f9"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.homeContent}>
                <View>
                  <Text style={styles.greet}> Good Morning John</Text>
                </View>
                <View style={styles.scanIdSection}>
                  <ImageBackground
                    source={require('../../assets/ID-Card.png')}
                    style={styles.idImage}></ImageBackground>
                </View>

                <View>
                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.scanButton]}
                    onPress={this.scan.bind(this)}
                    underlayColor="#3286C9">
                    <Text style={styles.scanText}>Scan ID</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  idImage: {
    width: Dimensions.get('screen').width - 50,
    height: 180,
    marginTop: 50,
    borderRadius: 0,
    borderWidth: 0,
    shadowColor: '#000',
    // shadowOffset:{
    // width: 0,
    // height: 9,
    // },
    // shadowOpacity: 0.50,
    // shadowRadius: 12.35,
    // elevation: 19,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -100,
    marginTop: 80,
    width: Dimensions.get('screen').width - 50,
    borderRadius: 5,
  },
  scanButton: {
    backgroundColor: '#3da3f5',
    height: 60,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {
      width: 1,
      height: 13,
    },
  },
  scanText: {
    color: '#f4f4f4',
    fontSize: 18,
  },
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: Dimensions.get('screen').height - 100 * 8,
  },
  greet: {
    fontSize: 24,
    color: '#aec2cd',
    textAlign: 'center',
    marginTop: -100,
    paddingBottom: 10,
  },
  scanIdSection: {
    width: Dimensions.get('screen').width - 50,
  },
  searchHead: {
    paddingTop: 5,
    backgroundColor: '#2f96f3',
    height: Dimensions.get('screen').height - 800,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
  },
  search: {
    width: Dimensions.get('screen').width - 65,
    marginTop: -30,
    marginLeft: 35,
    borderWidth: 5,
    borderColor: '#2f96f3',
    borderRadius: 0,
    height: 40,
    paddingLeft: 30,
    paddingRight: 80,
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  searchIcon: {
    marginTop: -33,
    marginLeft: 90,
    alignSelf: 'flex-end',
  },
  name: {
    width: Dimensions.get('screen').width - 50,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
});
