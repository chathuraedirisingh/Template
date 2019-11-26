import React, { Component } from 'react'
import { Platform, Button, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DESIRED_RATIO = "4:3";
export default class ScanIDScreen extends Component {

    state = {}

    // prepareRatio = async () => {
    //     if (Platform.OS === 'android' && this.cam) {
    //         const ratios = await this.cam.getSupportedRatiosAsync();
    //         console.log(ratios);
    //         // See if the current device has your desired ratio, otherwise get the maximum supported one
    //         // Usually the last element of "ratios" is the maximum supported ratio
    //         const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

    //         this.setState({ ratio });
    //     }
    // }

    onCameraReady = async () => {
        if (this.cam) {
            const ratios = await this.cam.getSupportedRatiosAsync();

            const sizes = await this.cam.getAvailablePictureSizes();

            console.log('onCameraReady ratios: ', ratios);
            console.log('onCameraReady sizes: ', sizes);
        }
    };

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
                    <View style={{ flex: 2, alignItems: 'center', alignContent: 'center' }}>
                        <View style={styles.preview2}>
                            <RNCamera
                                ref={ref => {
                                    this.cam = ref;
                                }}
                                style={styles.camera}
                                onCameraReady={this.onCameraReady} // You can only get the supported ratios when the camera is mounted
                                ratio={this.state.ratio}
                            >
                            </RNCamera>
                            
                        </View>
                        <Button title='SCAN ID'/>
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
        marginTop: 10,
        height: 240,
        width: winWidth - 15,
        borderRadius: 15,
        overflow: 'hidden'
    },
    camera: {
        height: 240,
        width: winWidth - 10
    }
})