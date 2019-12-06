import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class ShowDetailsScreen extends Component {

    render() {
        const { navigation } = this.props;

        console.log(navigation.getParam('passedData'))
        
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
