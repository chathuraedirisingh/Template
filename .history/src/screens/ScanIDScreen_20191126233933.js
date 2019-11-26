import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export default class ScanIDScreen extends Component {
    static navigationOptions = {
        title: 'Scan ID',
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerStyle: {
            backgroundColor: '#f4511e',
          },
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView >
                    <TouchableOpacity style={{ alignItems: "flex-start", flexDirection:'row', margin: 16 }} onPress={this.props.navigation.openDrawer}>
                        <Icon name="bars" size={25} color="#1c5dc9" />
                        <Text>Hi</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Scan ID</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
