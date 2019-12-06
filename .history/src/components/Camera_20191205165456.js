import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { withNavigationFocus } from "react-navigation";

class Camera extends Component {
    renderCamera() {
        const isFocused = this.props.navigation.isFocused();
        
        if (!isFocused) {
            return null;
        } else if (isFocused) {
            return (
            //    <QRCodeScanner />
            )
        }

     render() {
        return (
          <View style={{ flex: 1 }}>
             {this.renderCamera()}
          </View>
    }
    }
}


export default withNavigationFocus(Camera);