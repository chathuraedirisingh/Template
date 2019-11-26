import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeScreen extends Component {
    render() {
        return (
            <View
                style={{ flex: 1 }}>
                <SafeAreaView
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                    >
                        <Icon name="bars" size={24} color="#161924"
                            onPress={this.props.navigation.openDrawer} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.props.name} Screen </Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

