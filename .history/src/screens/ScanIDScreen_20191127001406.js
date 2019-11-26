import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RNCamera } from 'react-native-camera';

export default class ScanIDScreen extends Component {

    onCameraReady = async () => {
        if (this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync();

            const sizes = await this.camera.getAvailablePictureSizes();

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
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                        >
                        </RNCamera>
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
        height:4* winHeight/3,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
})