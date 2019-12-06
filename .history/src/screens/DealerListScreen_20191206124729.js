import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';

export default class DealerListScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#2678c2" barStyle="light-content" />

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.searchHead}>
              <TouchableOpacity style={{alignItems: 'flex-start', margin: 20}}>
                <Icon
                  name="bars"
                  size={25}
                  color="#f9f9f9"
                  onPress={this.props.navigation.openDrawer}
                />
                <TextInput
                  placeholder="Search Here"
                  style={styles.search}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#d5e6ee"
                />
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={22}
                  color="#f9f9f9"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
