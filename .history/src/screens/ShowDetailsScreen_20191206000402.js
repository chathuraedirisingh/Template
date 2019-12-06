import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class ShowDetailsScreen extends Component {

    render() {
        const { title } = this.props.navigation.props.passedData
        console.log(title)
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
