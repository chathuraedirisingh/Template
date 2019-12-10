import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class AddConsumerScreen extends Component {
  render() {
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
              <View style={{flex: 1}}>
                <View style={styles.addressContent}>
                  <Text style={styles.addressTitle}>Joy Jennifer Doe</Text>
                  <Text style={styles.addressData}>03/31/92 |XXX-XX-7890</Text>
                  <Text style={styles.addressData}>
                    2865 101st street, Portland {'\n'} OR, 97011
                  </Text>
                </View>
              </View>
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
