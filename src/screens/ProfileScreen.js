import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() => navigate('Home', { name: 'Jane' })}
            />
        );
    }
}
