import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

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
          <Text>{this.state.data.dob.date}</Text>
          <Text>{`${this.state.data.name.first} ${this.state.data.name.last}`}</Text>
          <Text>{`${this.state.data.name.first} ${this.state.data.name.last}`}</Text>
        </View>
      </View>
    );
  }
}
