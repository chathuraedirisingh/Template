import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';

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
        </View>

        <View>
          <Avatar
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/men/41.jpg',
            }}
            size="large"
          />

          <Badge
            status="success"
            containerStyle={{position: 'absolute', top: -4, right: -4}}
          />
        </View>
      </View>
    );
  }
}
