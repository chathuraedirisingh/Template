import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class ShowDetailsScreen extends Component {

    render() {
        const { navigation } = this.props;

        console.log(navigation.getParam('passedData'))
        
        console.log(title)
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
