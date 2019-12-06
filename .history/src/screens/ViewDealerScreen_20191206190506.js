import React, {Component} from 'react';
import {Text, View, StatusBar,Dimensions, KeyboardAvoidingView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ViewDealerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  render() {
    const {navigation} = this.props;
    this.state.data = navigation.getParam('dealer');

    console.log(this.state.data);

    return (
      <View style={{flex: 1}}>
          <StatusBar backgroundColor="#2678c2" barStyle="light-content" />
          <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.searchHead}>
              <TouchableOpacity style={{alignItems: 'flex-start', margin: 20}}>
                <Icon
                  name="bars"
                  size={25}
                  color="#f9f9f9"
                  onPress={this.props.navigation.openDrawer}
                />
              </TouchableOpacity>
            </View>
            </SafeAreaView>
            
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            marginTop: -240,
          }}>
          <Avatar
            size="xlarge"
            onPress={() => console.log('Works!')}
            source={{uri: this.state.data.picture.large}}
          />
          <Text>{`${this.state.data.name.first} ${this.state.data.name.last}`}</Text>
          <Text>
            {Moment(this.state.data.dob.date).format('DD/MM/YYYY')} |{' '}
            {this.state.data.phone}
          </Text>
          <Text>{`${this.state.data.location.street.number} ${this.state.data.location.street.name}street,`}</Text>
          <Text>{`${this.state.data.location.city}, ${this.state.data.location.state}, ${this.state.data.location.country}`}</Text>

          <Input
            placeholder=" Enter mobile number (required)"
            leftIcon={{type: 'font-awesome', name: 'phone'}}
            containerStyle={{width: 380, marginTop: 30}}
          />
        </View>
        <View
          style={{
            flex: 1,
            // flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: 80, height: 80, backgroundColor: 'powderblue'}}></View>
            <View style={{width: 80, height: 80, backgroundColor: 'skyblue'}}></View>
            <View style={{width: 80, height: 80, backgroundColor: 'steelblue'}}></View>
            <View style={{width: 80, height: 80, backgroundColor: 'skyblue'}}></View>
          </View>

          <View
            style={{
              // flex: 1,
              marginTop:-50,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: 75, height: 75, backgroundColor: 'powderblue'}}></View>
            <View style={{width: 75, height: 75, backgroundColor: 'skyblue'}}></View>
            <View style={{width: 75, height: 75, backgroundColor: 'steelblue'}}></View>
            <View style={{width: 75, height: 75, backgroundColor: 'skyblue'}}></View>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchHead: {
        paddingTop: 5,
        backgroundColor: '#2f96f3',
        height: Dimensions.get('screen').height - 800,
    
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 10,
      },
});