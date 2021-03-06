import React, {Component} from 'react';
import {
  Platform,
  Button,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as BlinkIDReactNative from 'blinkid-react-native';

const licenseKey = Platform.select({
  ios:
    'sRwAAAEIY29tLmNvcmWlB9YEexqAQ4yo7SEaIEvpwO8X99s/6zsUOyeYGPKr1qEW2xW7FfowIsvkQCzkxvC3B9uZtWxur8RkeH24LZCr28eLMqQ5Wsd6EFp40CJyA2QwrJI5BzJw4af3np5v9TXsLvNYOfqaFeVVY2SFgZCDaoWar+bPWDGFd/Yn9lUF7PGeFHaC0/TuI2isjjTLUs479yBqCjujJo6jZXPAfBk778xCnh0QmBsefvMAtMk8Ad/1U8sPosrRtOMiYRtyEFBNjj07izbEKQ==',
  android:
    'sRwAAAAIY29tLmNvcmWSfF3q4eDAnywqpYl9/PfX5x8XjMvbJakkdGhRhGFKID3QoVvb34wZy3vXC92swTvLA0kv0s0qhAcrSVkL1kwZAKzZcaN+d5aqmJUpPlEgzdJB/ceM6Uz+wjC5E0Boe9nBR5FGWbmMEWKFbroN3ovXp3DUhLQEhVPrJpsqvOn2I4b/fSGQB0T7CeaZ7XbZ1i54D6NNU8dy1RlioWeesL741zc2nkEgxEwe+7Jz5aKEqknzWNvnKd20dg9bzL8qn15cnS3NkIOA4Q==',
});

var renderIf = function(condition, content) {
  if (condition) {
    return content;
  }
  return null;
};

export default class ScanIDScreen extends Component {
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

  static navigationOptions = {
    title: 'Scan ID',
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({focusedScreen: true}),
    );
    navigation.addListener('willBlur', () =>
      this.setState({focusedScreen: false}),
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          {/* remove */}
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
              <View style={styles.progressTextBlock}>
                {this.state.scaning ? (
                  <Text style={styles.progressText}>
                    We are processing your request...
                  </Text>
                ) : (
                  <Text style={styles.progressText}>Ready To Capture ID</Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              alignContent: 'center',
              padding: 5,
            }}>
            <View style={styles.preview2}>
              <RNCamera
                ref={ref => {
                  this.cam = ref;
                }}
                style={styles.camera}
                onCameraReady={this.onCameraReady} // You can only get the supported ratios when the camera is mounted
                ratio={this.state.ratio}></RNCamera>
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.scanButton]}
              onPress={this.takePicture.bind(this)}
              underlayColor="#3286C9">
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Capture Licence
              </Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  takePicture = async () => {
    if (this.cam) {
      const options = {quality: 0.5, base64: true};
      const data = await this.cam.takePictureAsync(options);
      if (data !== null && !this.state.scaning) {
        this.setState({scaning: true});
        alert(data.uri);
      }
      setInterval(() => {
        this.setState({scaning: false});
      }, 3000);
    }
  };
}

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    width: Dimensions.get('screen').width - 50,
    borderRadius: 5,
  },
  scanButton: {
    backgroundColor: '#3da3f5',
    height: 70,
    borderRadius: 3,
    paddingTop: 1,
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
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    // shadowColor: "#f9f9f9",
    // shadowOffset: {
    //     width: 1,
    //     height: 2,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 5.3,
    // elevation: 6,
  },
  progressTextBlock: {
    padding: 20,
    marginBottom: 10,
    borderWidth: 0,
    margin: 10,
    // backgroundColor: "#DCE4E8",
    // borderWidth: 0,
    // borderRadius: 10
  },
  progressText: {
    fontSize: 22,
    color: '#858585',
    textAlign: 'center',
    marginTop: 0,
    paddingBottom: 2,
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
  headerText: {
    width: Dimensions.get('screen').width,
    marginTop: -3,
    marginLeft: 145,
    height: 40,
    fontSize: 22,
    fontWeight: 'bold',
    // paddingLeft: 45,
    // paddingRight: 15,
  },
  preview: {
    // height: winHeight,
    // width: winWidth,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0,
    height: hp('40%'),
    width: hp('40%'),
    // borderRadius: hp('20%'),
  },

  preview2: {
    marginTop: -50,
    height: 240,
    width: winWidth - 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    height: 240,
    width: winWidth - 10,
  },
  fullWidthButton: {
    // backgroundColor: 'blue',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white',
  },
});
