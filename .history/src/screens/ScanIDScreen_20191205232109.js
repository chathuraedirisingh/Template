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
  ScrollView,
  Image
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

  async scan() {
    try {
      // var usdlRecognizer = new BlinkIDReactNative.UsdlCombinedRecognizer();
      // usdlRecognizer.returnFullDocumentImage = true;
      // usdlRecognizer.returnFaceImage = true;
      
      // const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
      //   new BlinkIDReactNative.DocumentVerificationOverlaySettings(),
      //   new BlinkIDReactNative.RecognizerCollection([usdlRecognizer]),
      //   licenseKey
      // );


      // to scan any machine readable travel document (passports, visa's and IDs with
      // machine readable zone), use MrtdRecognizer
      // var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
      // mrtdRecognizer.returnFullDocumentImage = true;

      // var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

      // BlinkIDRecognizer automatically classifies different document types and scans the data from
      // the supported document
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
    let fieldDelim = ';\n';

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
      // let fields = result.fields
      let blinkIdResult= result;
      // let USDLKeys = BlinkIDReactNative.USDLKeys;
      console.log(blinkIdResult);

      // localState.results +=
      // 'SSN: ' + fields[USDLKeys.SocialSecurityNumber]+fieldDelim+
      // 'USDL version: '+ fields[USDLKeys.StandardVersionNumber]+fieldDelim+
      // 'Family name: '+fields[USDLKeys.CustomFamilyName]+fieldDelim+
      // 'First name: '+fields[USDLKeys.CustomFirstName]+fieldDelim+
      // 'Date of birth: '+fields[USDLKeys.DateOfBirth]+fieldDelim+
      // 'Sex: '+fields[USDLKeys.Sex]+fieldDelim+
      // 'Eye Color: '+fields[USDLKeys.EyeColor]+fieldDelim+
      // 'Height: '+fields[USDLKeys.Height]+fieldDelim+
      // 'Street: '+fields[USDLKeys.AddressStreet]+fieldDelim+
      // 'City: '+fields[USDLKeys.AddressCity]+fieldDelim+
      // 'Jurisdiction: '+fields[USDLKeys.AddressJurisdictionCode]+fieldDelim+
      // 'Postal code: '+fields[USDLKeys.AddressPostalCode]+fieldDelim+
      // 'Issue date: '+fields[USDLKeys.DocumentIssueDate]+fieldDelim+
      // 'Expiration date: '+fields[USDLKeys.DocumentExpirationDate]+fieldDelim+
      // 'Issuer ID: '+fields[USDLKeys.IssuerIdentificationNumber]+fieldDelim+
      // 'Jurisdiction version: '+fields[USDLKeys.JurisdictionVersionNumber]+fieldDelim+
      // 'Vehicle class: '+fields[USDLKeys.JurisdictionVehicleClass]+fieldDelim+
      // 'Restrictions: '+fields[USDLKeys.JurisdictionRestrictionCodes]+fieldDelim+
      // 'Endorsments : '+fields[USDLKeys.JurisdictionEndorsmentCodes]+fieldDelim+
      // 'Customer ID: '+fields[USDLKeys.CustomerIdNumber]+fieldDelim;
      
      // // Document image is returned as Base64 encoded JPEG
      // if (blinkIdResult.fullDocumentImage) {
      //   localState.showImageDocument = true;
      //   localState.resultImageDocument =
      //     'data:image/jpg;base64,' + blinkIdResult.fullDocumentImage;
      // }
      // // Face image is returned as Base64 encoded JPEG
      // if (blinkIdResult.faceImage) {
      //   localState.showImageFace = true;
      //   localState.resultImageFace =
      //     'data:image/jpg;base64,' + blinkIdResult.faceImage;
      // }
    
    }
    return localState;
  }

  render() {
    const {navigate} = this.props.navigation;
    let displayImageDocument = this.state.resultImageDocument;
        let displayImageFace = this.state.resultImageFace;
        let displaySuccessFrame = this.state.successFrame;
        let displayFields = this.state.results;

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
            {/* <View style={styles.preview2}>
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
            </TouchableHighlight>  */}

            <Button
              onPress={this.scan.bind(this)}
              title="Scan"
              color="#87c540"
            />
          </View>

          <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}y> 
            {renderIf(this.state.showImageDocument,
                <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    source={{uri: displayImageDocument, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            {renderIf(this.state.showImageFace,
                <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    source={{uri: displayImageFace, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            {renderIf(this.state.showSuccessFrame,
                <View style={styles.imageContainer}>
                    <Image
                    resizeMode='contain'
                    source={{uri: displaySuccessFrame, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            <Text style={styles.results}>{displayFields}</Text>
            </ScrollView>
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

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
});
