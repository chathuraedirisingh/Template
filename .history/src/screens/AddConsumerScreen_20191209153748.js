import React, {Component} from 'react';
import {Text, StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

export default class AddConsumerScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onPaymentStepComplete = () => {
    alert('Payment step completed!');
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
      completedCheckColor: '#4bb543',
    };

    const buttonTextStyle = {
      color: '#686868',
      fontWeight: 'bold',
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
            <View style={{marginTop: -20}}>
              <ProgressSteps>
                <ProgressStep
                  label="Payment"
                  onNext={this.onPaymentStepComplete}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}>
                  <View style={{alignItems: 'center'}}>
                    <Text>Payment step content</Text>
                  </View>
                </ProgressStep>
                <ProgressStep
                  label="Shipping Address"
                  onNext={this.onNextStep}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}>
                  <View style={{alignItems: 'center'}}>
                    <Text>Shipping address step content</Text>
                  </View>
                </ProgressStep>
                <ProgressStep
                  label="Billing Address"
                  onNext={this.onNextStep}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}>
                  <View style={{alignItems: 'center'}}>
                    <Text>Billing address step content</Text>
                  </View>
                </ProgressStep>
                <ProgressStep
                  label="Confirm Order"
                  onPrevious={this.onPrevStep}
                  onSubmit={this.onSubmitSteps}
                  scrollViewProps={this.defaultScrollViewProps}>
                  <View style={{alignItems: 'center'}}>
                    <Text>Confirm order step content</Text>
                  </View>
                </ProgressStep>
              </ProgressSteps>
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
