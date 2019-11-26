import React, { Component } from 'react'
import { Dimensions, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler'

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <SafeAreaView
                    style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: 'flex-start', margin: 16 }}>
                        <Icon name="bars" size={24} color="#161924"
                            onPress={this.props.navigation.openDrawer} />
                        <TextInput placeholder="Search Here" style={styles.search} />
                        <Icon style={styles.searchIcon} name='search' size={22} color='#1c5dc9' />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.props.name} Home Screen </Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

// activeBackgroundColor: '#1c5dc9',
// activeTintColor: '#FFF',

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    search: {
        width: Dimensions.get('screen').width - 65,
        marginTop: -33,
        marginLeft: 35,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 25,
        height: 40,
        paddingLeft: 45,
        paddingRight: 15,
    },
    searchIcon: {
        marginTop: -33,
        marginLeft: 48,
    },
    name: {
        width: Dimensions.get('screen').width - 50,
        color: '#FFF',
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
    },
    followers: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
    }
});

