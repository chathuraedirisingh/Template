import React, {Component} from 'react';
import {Text, View, StatusBar,Dimensions, KeyboardAvoidingView, StyleSheet, SafeAreaView, TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors'

export default class ViewDealerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealer: [],
    };
  }

  render() {
    const {navigation} = this.props;
    this.state.dealer = navigation.getParam('dealer');
    console.log(this.state.dealer);
    return (
      <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.headContainer}>
                  <Icon
                  style={styles.drawerIcon}
                  name="bars"
                  size={25}
                  color="#f9f9f9"
                  onPress={this.props.navigation.openDrawer}
                  />
          </View>
   
        </SafeAreaView>

      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}} behavior="padding" keyboardVerticalOffset={150}>
    
          <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            marginTop: -255,
          }}>
   
          <Avatar
            rounded
            size="xlarge"
            onPress={() => console.log('Works!')}
            source={{uri: this.state.dealer.face_image}}
          />
          <View style={{opacity:0.6,flex:0,alignItems:'center'}}>
            <Text>{`${this.state.dealer.first_name} ${this.state.dealer.last_name}`}</Text>
            <Text>
              {Moment(this.state.dealer.date_of_birth).format('DD/MM/YYYY')} |{' '}
              {this.state.data.phone}
            </Text>
            <Text>{`${this.state.data.location.street.number} ${this.state.data.location.street.name}street,`}</Text>
            <Text>{`${this.state.data.location.city}, ${this.state.data.location.state}, ${this.state.data.location.country}`}</Text>
          </View>
         

          <Input
            placeholder=" Enter mobile number (required)"
            placeholderTextColor={colors.MD_GRAY}
            returnKeyType='next'
            leftIcon={
              {type: 'font-awesome', name: 'send'},
              <Icon
                name='send'
                size={22}
                color={colors.BG_MAIN_COVER}
              />
            }
            containerStyle={{width: 380, marginTop: 22,paddingTop:8}}
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
              marginTop:-60,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}
            onPress={() => {this.props.navigation.navigate('AddConsumer')}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Profile</Text>
            <Icon
                  name="folder-open"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}
              onPress={() => {this.props.navigation.navigate('HardPull',{data: this.state.data})}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Hard Pull</Text>
            <Icon
                  name="users"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Action 2</Text>
            <Icon
                  name="signal"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flex: 1,
              marginTop:-140,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Action 3</Text>

            <Icon
                  name="briefcase"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Action 4</Text>
            <Icon
                  name="line-chart"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius:10, alignContent:"center", alignItems:'center',paddingTop:6, margin:5, borderColor:'skyblue', borderWidth:1}}>
            <Text style={{fontWeight: "bold", color:'skyblue'}}>Action 5</Text>
            <Icon
                  name="search"
                  size={40}
                  color={colors.SKY_BLUE}
                />
            </TouchableOpacity>
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
  headContainer: {
    backgroundColor: colors.BG_MAIN_COVER,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  searchIcon: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  drawerIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});