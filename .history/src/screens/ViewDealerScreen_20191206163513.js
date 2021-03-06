import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 10,
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
          containerStyle={{width:400}}
        />
        </View>

        
      </View>
    );
  }
}
