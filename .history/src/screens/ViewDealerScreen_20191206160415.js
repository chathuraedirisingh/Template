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
        <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
          <Avatar
            size="xlarge"
            onPress={() => console.log('Works!')}
            source={{uri: this.state.data.picture.large}}
          />
        </View>
      </View>
    );
  }
}
