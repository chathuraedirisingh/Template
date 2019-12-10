import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextStep = () => {
    const {next, saveState} = this.props;
    // Save state for use in other steps
    saveState({name: 'samad'});

    // Go to next step
    next();
  };

  goBack() {
    const {back} = this.props;
    // Go to previous step
    back();
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
