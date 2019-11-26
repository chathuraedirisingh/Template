import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions,Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RNCamera } from 'react-native-camera';

export default class ScanIDScreen extends Component {

    state = {}

    prepareRatio = async () => {
        if (Platform.OS === 'android' && this.cam) {
             const ratios = await this.cam.getSupportedRatiosAsync();

             // See if the current device has your desired ratio, otherwise get the maximum supported one
             // Usually the last element of "ratios" is the maximum supported ratio
             const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
             
             this.setState({ ratio });
        }
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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', margin: 16 }} onPress={this.props.navigation.openDrawer}>
                        <Icon name="bars" size={25} color="#1c5dc9" />
                        {/* <Text style={styles.headerText}>Hi</Text> */}
                    </TouchableOpacity>
                    <View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            // marginBottom: Styles.Constant.CARD_BASE_MARGIN
                        }}>
                            <RNCamera
                                style={{ flex: 1 }}
                                onBarCodeRead={(code) => {
                                    if (this.state.barcode === '') this._onBarcodeRead(code)
                                }}
                                flashMode={this.props.flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                                captureAudio={false}
                                showViewFinder={false}>
                                {/* {scanArea} */}
                            </RNCamera>
                        </View>
                        <Text>Scan ID</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');


const styles = StyleSheet.create({
    headerText: {
        width: Dimensions.get('screen').width,
        marginTop: -3,
        marginLeft: 145,
        height: 40,
        fontSize: 22,
        fontWeight: 'bold'
        // paddingLeft: 45,
        // paddingRight: 15,

    },
    preview: {
        height: 4 * winHeight / 3,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
})