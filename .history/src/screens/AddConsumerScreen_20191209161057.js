import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Input} from 'react-native-elements';
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
    // alert('Payment step completed!');
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
          </SafeAreaView>
          <View style={{flex: 12, marginTop: -30}}>
            <ProgressSteps>
              <ProgressStep
                label=""
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
                  <Text
                    style={{
                      color: 'steelblue',
                      justifyContent: 'center',
                      marginTop: -10,
                      marginBottom: 15,
                      fontWeight: 'bold',
                    }}>
                    Please review the application for accuracy
                  </Text>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        alignContent: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        marginTop: 5,
                        color: 'gray',
                        fontWeight: 'bold',
                      }}>
                      Personal Information
                    </Text>
                  </View>
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="First Name"
                    placeholder="Enter first name"
                    value="Joy"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Middle Name"
                    placeholder="Enter middle name"
                    value="Jeniffer"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Last Name"
                    placeholder="Enter last name"
                    value="Doe"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Birth Day"
                    placeholder="INPUT WITH ICON"
                    value="March 31 1997"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    leftIcon={<Icon name="calendar" size={24} color="green" />}
                    leftIconContainerStyle={{
                      marginLeft: 5,
                      paddingRight: 5,
                      marginTop: -10,
                    }}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Social Security Number"
                    placeholder="INPUT WITH ICON"
                    value="123-156-2876"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                label=""
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
                  <Text
                    style={{
                      color: 'steelblue',
                      justifyContent: 'center',
                      marginTop: -10,
                      marginBottom: 15,
                      fontWeight: 'bold',
                    }}>
                    Please review the application for accuracy
                  </Text>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        alignContent: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        marginTop: 5,
                        color: 'gray',
                        fontWeight: 'bold',
                      }}>
                      Contact Information
                    </Text>
                  </View>
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Email"
                    placeholder="Enter email"
                    value="joy.doe@gmail.com"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value="(321)654-0789"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="Address"
                    placeholder="Enter address"
                    value="2453, 101 ave"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />
                  <Input
                    containerStyle={{marginTop: 10}}
                    inputStyle={{marginTop: -10}}
                    label="City"
                    placeholder="Select city"
                    value="Austin"
                    rightIcon={<Icon name="check" size={24} color="green" />}
                    rightIconContainerStyle={{
                      marginTop: -10,
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <Input
                      containerStyle={{marginTop: 10, width: '50%'}}
                      inputStyle={{marginTop: -10}}
                      label="State"
                      placeholder="INPUT WITH ICON"
                      value="Texas"
                      rightIcon={<Icon name="check" size={24} color="green" />}
                      rightIconContainerStyle={{
                        marginTop: -10,
                      }}
                    />
                    <Input
                      containerStyle={{marginTop: 10, width: '50%'}}
                      inputStyle={{marginTop: -10}}
                      label="Zip"
                      placeholder="INPUT WITH ICON"
                      value="76079"
                      rightIcon={<Icon name="check" size={24} color="green" />}
                      rightIconContainerStyle={{
                        marginTop: -10,
                      }}
                    />
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label=""
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
                  <Text
                    style={{
                      color: 'steelblue',
                      justifyContent: 'center',
                      marginTop: -10,
                      marginBottom: 15,
                      fontWeight: 'bold',
                    }}>
                    Please review the application for accuracy
                  </Text>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        alignContent: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        marginTop: 5,
                        color: 'gray',
                        fontWeight: 'bold',
                      }}>
                      Employement Information
                    </Text>
                  </View>
                  <ScrollView>
                    <View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignContent: 'center',
                        }}>
                        {/* <Input
                          containerStyle={{marginTop: 10, width: '50%'}}
                          inputStyle={{marginTop: -10}}
                          label="Employement Status"
                          placeholder="INPUT WITH ICON"
                          value="Employed"
                          rightIcon={
                            <Icon name="check" size={24} color="green" />
                          }
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                        /> */}
                        <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{marginTop:10, marginLeft:8}}>Hi</Text>
                        <Picker style={{width: '100%'}}>
                          <Picker.Item label="Employed" value="employed" />
                          <Picker.Item
                            label="Self employed / 1099"
                            value="selfemployed"
                          />
                          <Picker.Item label="Retired" value="retired" />
                          <Picker.Item label="Other" value="other" />
                        </Picker>
                        </View>
                        
                        <Input
                          containerStyle={{marginTop: 10, width: '50%'}}
                          inputStyle={{marginTop: -10}}
                          label="Employer Name"
                          placeholder="INPUT WITH ICON"
                          value="Walmart"
                          rightIcon={
                            <Icon name="check" size={24} color="green" />
                          }
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                        />
                      </View>
                      <Input
                        containerStyle={{marginTop: 10}}
                        inputStyle={{marginTop: -10}}
                        label="Job Title"
                        placeholder="Enter last name"
                        value="Store Manager"
                        rightIcon={
                          <Icon name="check" size={24} color="green" />
                        }
                        rightIconContainerStyle={{
                          marginTop: -10,
                        }}
                      />
                      <Input
                        containerStyle={{marginTop: 10}}
                        inputStyle={{marginTop: -10}}
                        label="Phone Number"
                        placeholder="INPUT WITH ICON"
                        value="(123) 567-7890"
                        rightIcon={
                          <Icon name="check" size={24} color="green" />
                        }
                        rightIconContainerStyle={{
                          marginTop: -10,
                        }}
                      />
                      <Input
                        containerStyle={{marginTop: 10}}
                        inputStyle={{marginTop: -10}}
                        label="Annual Income (before Taxes"
                        placeholder="INPUT WITH ICON"
                        value="$ 105,000"
                        rightIcon={
                          <Icon name="check" size={24} color="green" />
                        }
                        rightIconContainerStyle={{
                          marginTop: -10,
                        }}
                      />
                      <Text style={{color: 'gray'}}>
                        approx $2,019.23/week or $8,700.00/month
                      </Text>

                      <Input
                        containerStyle={{marginTop: 10}}
                        inputStyle={{marginTop: -10}}
                        label="Start Date"
                        placeholder="INPUT WITH ICON"
                        value="March 10, 1998"
                        rightIcon={
                          <Icon name="check" size={24} color="green" />
                        }
                        rightIconContainerStyle={{
                          marginTop: -10,
                        }}
                        leftIcon={
                          <Icon name="calendar" size={24} color="green" />
                        }
                        leftIconContainerStyle={{
                          marginTop: -10,
                        }}
                      />

                      <Text
                        style={{
                          color: 'steelblue',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        + Add another source of income
                      </Text>
                      <Text style={{color: 'gray'}}>
                        approx $2,019.23/week or $8,700.00/month
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
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
