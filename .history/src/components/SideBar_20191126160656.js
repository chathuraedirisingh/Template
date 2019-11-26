import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native'
import { DrawerNavigationItems } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/dist/FontAwesome'


export default SideBar = props => (
    <ScrollView>
        <ImageBackground source={require('../../assets/background.png')} style={{ width: undefined, padding: 16, paddingTop: 48 }}>
            <Image source={require('../../assets/profile-pic.jpg')} style={styles.profile} />
            <Text style={styles.name}>Helen Stewart</Text>
        </ImageBackground>
    </ScrollView>
)

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    profile:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:3,
        borderColor:"#FFF",
    },
    name:{
        color:'#FFF',
        fontSize:20,
        fontWeight:3,
        marginVertical:8,
    }
});