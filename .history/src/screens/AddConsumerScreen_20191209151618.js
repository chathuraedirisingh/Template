import React, {Component} from 'react';
import {Text, StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

export default class AddConsumerScreen extends Component {
  onNextStep = () => {
    console.log('called next step');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };
  render() {

    const progressStepsStyle = {
        activeStepIconBorderColor: '#686868',
        activeLabelColor: '#686868',
        activeStepNumColor: 'white',
        activeStepIconColor: '#686868',
        completedStepIconColor: '#686868',
        completedProgressBarColor: '#686868',
        completedCheckColor: '#4bb543'
      };
  
      const buttonTextStyle = {
        color: '#686868',
        fontWeight: 'bold'
      };
    
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2678c2" barStyle="light-content" />
        <View style={{flex: 1}}>
          <SafeAreaView>
            <View
              style={{
                alignItems: 'flex-start',
                margin: 10,
                flexDirection: 'row',
              }}>
              <Icon
                name="bars"
                size={25}
                color="#5F9CCE"
                onPress={this.props.navigation.openDrawer}
              />
            </View>
            <View>
              <Text>Hello</Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
