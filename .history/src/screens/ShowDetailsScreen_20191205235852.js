import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class ShowDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
      }

    componentDidMount(){
        console.log(this.props.passedData);
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
