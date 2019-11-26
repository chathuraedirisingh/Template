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
                    <TouchableOpacity
                        style={{ alignItems:'flex-start', margin: 16 }}
                    >
                        <Icon name="bars" size={24} color="#161924"
                            onPress={this.props.navigation.openDrawer} />
                        <TextInput value="Search Here" style={styles.search}/>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.props.name} Screen </Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    search: {
        marginTop:-38,
        marginLeft:15,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius:25,
    },
    name: {
        width: Dimensions.get('screen').width-50,
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

