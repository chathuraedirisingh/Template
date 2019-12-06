import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {} from'react-native-elements'

export default class ViewDealerScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
      }
    render() {
        const {navigation} = this.props;
        this.state.data = (navigation.getParam('dealer'));

        console.log(this.state.data);

        return (
            <View>
                <Text> {this.state.data.email} </Text>
            </View>
        )
    }
}
