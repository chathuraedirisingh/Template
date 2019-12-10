import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';

class Step1 extends Component {
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
        <View style={[styles.container, styles.step1]}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={"First Name"}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={"Last Name"}
          placeholderTextColor="#fff"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Text
              style={styles.btnImage}
              resizeMode="cover"
            >Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Step1;