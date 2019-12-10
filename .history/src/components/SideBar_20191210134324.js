import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';


function getUsername(){
    AsyncStorage.getItem('@username').then(data => {
        if (data) {
          return data;
        }
      });

      console.log("hi")
}
export default SideBar = props => (
    <ScrollView>
        <ImageBackground source={require('../../assets/glamorous-copy-c.jpg')} style={{ width: undefined, padding: 16, paddingTop: 48 }}>
            <Image source={require('../../assets/profile-pic.jpg')} style={styles.profile} />
                <Text style={styles.name}>{this.getUsername()}</Text>
            <View style={{ flexDirection: 'row' }}>
                {/* <Text style={styles.followers}>734 Followers </Text> */}
                {/* <Icon name="users" size={16} color="rgba(255,255,255,0.8)" /> */}
            </View>
        </ImageBackground>
        <View style={styles.container}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
)


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
    },
    name: {
        color: '#31393C',
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
    },
    followers: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
    }
});