import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {

        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() => navigate('Profile', { name: 'Jane' })}
            />
        )
    }
}

import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'

class HomeScreen extends Component {
    render() {
        return (
            <View>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{alignItems:"flex-start", margin:16}} onPress={this.props.navigation.openDrawer }>
                        <Icon name="bars" size={24} color="#161924"/>
                    </TouchableOpacity>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text>Hello Home</Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

