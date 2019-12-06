import { withNavigationFocus } from 'react-navigation' 
import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Camera extends Component {
    render() {
        const { isFocused } = this.props
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else if (isFocused){
          return (this.cameraView());
        } else {
          return <View />;
        }
     }
}

export default withNavigationFocus(Camera)