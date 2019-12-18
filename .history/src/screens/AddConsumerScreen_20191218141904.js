import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Picker,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Input} from 'react-native-elements';
import colors from '../styles/colors'

export default class AddConsumerScreen extends Component {

  state = {
    submitted : false,
    user:[]
  }

  componentDidMount() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');
    console.log("You "+user.first_name)
  }

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

  toggleSubmition =(status) => {
    this.setState((prevState) => {
      return {submitted: status}});
    }

    onSubmitSteps = () => {
      console.log('called on submit step.');
      this.toggleSubmition(true)
      setTimeout(() => {
        this.toggleSubmition(false)
        this.props.navigation.navigate('ViewDealer')
      }, 3000)
    };

  render() {
    const {navigation} = this.props;
    const user = navigation.getParam('user', {});
    // console.log(user)

    const progressStepsStyle = {
      activeStepIconBorderColor: '#B0E0E6',
      activeLabelColor: 'green',
      activeStepNumColor: 'white',
      activeStepIconColor: '#B0E0E6',
      completedStepIconColor: '#4682B4',
      completedProgressBarColor: '#4682B4',
      completedCheckColor: 'green',
    };

    const buttonTextStyle = {
      color: '#686868',
      fontWeight: 'bold',
    };

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />
        <View style={{flex: 1}}>
          <SafeAreaView>
            <View
              style={{
                alignItems: 'flex-start',
                margin: 10,
                flexDirection: 'row',
                justifyContent:'space-between'
              }}>
              <Icon
                name="bars"
                size={25}
                color={colors.HIGHT_BLUE}
                onPress={this.props.navigation.openDrawer}
              />
              <TouchableHighlight>
                <View style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  justifyContent:'flex-start'}}>
                  <MatIcon
                    name="keyboard-return"
                    size={24}
                    color={colors.HIGHT_BLUE}
                    onPress={() => this.props.navigation.navigate('ViewDealer')}/>
                  {/* <Text style={{color:'#ddd',fontSize:12}}>Return</Text> */}
                </View>
              </TouchableHighlight>
            
            </View>
          </SafeAreaView>
          <View style={{flex: 12, marginTop: -30}}>
            <ProgressSteps {...progressStepsStyle}>
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
                    ref={el => {
                      this.firstname = el;
                    }}
                    onChangeText={firstname => this.setState({[user.firstname]:firstname})}
                    value={user.firstname}
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
                onSubmit={this.onSubmitSteps}
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
                        <Text style={{marginTop:10, marginLeft:8, color:'#8d8d8d', fontWeight:'bold', fontSize:16}}>Employement Status</Text>
                        <Picker style={{width: '100%', marginTop:-5}}>
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
                      <Text style={{color: 'gray', marginLeft:10}}>
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
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: 'steelblue',
                          fontWeight: 'bold',
                          fontSize: 16,
                          marginTop:5,
                          marginLeft:10
                        }}>
                        + Add another source of income
                      </Text>
                      </TouchableOpacity>
                      <Text style={{color: 'gray', marginLeft:10}}>
                        Alimony, child support, or seperate maintainance income need not be disclosed unless relied upon for credit
                      </Text>
                    </View>
                  </ScrollView>
              
                </View>
                {
                  this.state.submitted ? <View><ActivityIndicator size='large' color={colors.SKY_BLUE}/></View> : null
                }
               
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
