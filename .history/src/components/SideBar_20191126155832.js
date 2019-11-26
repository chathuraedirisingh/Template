import React, { Component } from 'react'
import { View, Text, Stylesheet, ScrollView, ImageBackground, Image } from 'react-native'
import { DrawerNavigationItems } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/dist/FontAwesome'


export default SideBar = props => (
    <ScrollView>
        <ImageBackground source={require('../../assets/background.png')} style={{ width: undefined, padding: 16, paddingTop: 48 }}>
            <Image source={require('../../assets/profile-pic.jpg')} style={Stylesheet.profile} />
        </ImageBackground>
    </ScrollView>
)

const styles = Stylesheet.create({
    container:{
        flex:1
    },
    profile:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:3,
        borderColor:"#FFF"
    }
});