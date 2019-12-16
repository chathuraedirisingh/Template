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
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';

import {List, ListItem} from 'react-native-elements';

import firebase from '../../configs/firebase';

const DealerItem = ({item}) => {
  // const { description, title } = article;
  return (
    <ListItem
      roundAvatar
      title={`${item.first_name} ${item.last_name}`}
      subtitle={item.document_number}
      leftAvatar={{source: {uri: item.face_image}}}
      containerStyle={{borderBottomWidth: 0}}
      onPress={() => {
        navigate(item);
      }}
      keyExtractor={item => item.document_number}
    />
  );
};
const DealerItem2 = ({item}) => {
  // const { description, title } = article;
  return (
    <ListItem
      roundAvatar
      title={`${item.first_name} ${item.last_name}`}
      subtitle={item.document_number}
      leftAvatar={{source: {uri: item.face_image}}}
      containerStyle={{borderBottomWidth: 0}}
      badge={{
        value: 'new',
        textStyle: {color: 'white'},
        status: 'success',
      }}
      onPress={() => {
        navigate(item);
      }}
      keyExtractor={item => item.document_number}
    />
  );
};

export default class DealerListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dealers: null,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
    this.get_dealers = this.get_dealers.bind(this);
  }

  componentDidMount() {
    // con
    // this.makeRemoteRequest();
    this.get_dealers();
  }

  makeRemoteRequest = () => {
    const {page, seed} = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=10`;
    this.setState({loading: true});
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
        console.log(this.state.data);
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  get_dealers() {
    console.log('hi');
    firebase
      .database()
      .ref('Users/')
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        var dealer_list = [];
        snapshot.forEach(child => {
          dealer_list.push({
            document_number: child.val().document_number,
            first_name: child.val().first_name,
            middle_name: child.val().middle_name,
            last_name: child.val().last_name,
            address: child.val().address,
            sex: child.val().sex,
            date_of_birth: child.val().date_of_birth,
            date_of_expiry: child.val().date_of_expiry,
            date_of_issue: child.val().date_of_issue,
            document_image: child.val().document_image,
            face_image: child.val().face_image,
            verified: child.val().verified,
          });
        });
        this.setState({dealers: dealer_list});
      });
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        // this.makeRemoteRequest();
        this.get_dealers();
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.get_dealers();
        // this.makeRemoteRequest();
      },
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderIf = (condition, content) => {
    if (condition) {
      return content;
    }
    return null;
  };

  keyExtractor = item => String(item.id);

  render() {
    const navigate = item => {
      console.log(item);
      this.props.navigation.navigate('ViewDealer', {
        dealer: item,
      });
    };

    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={colors.BG_STATUS_BAR}
          barStyle="light-content"
        />

        <SafeAreaView style={{flex: 0}}>
          <View style={styles.headContainer}>
            <View>
              <Icon
                style={styles.drawerIcon}
                name="bars"
                size={25}
                color="#f9f9f9"
                onPress={this.props.navigation.openDrawer}
              />
            </View>

            <TextInput
              onChangeText={this.handleSearchChange}
              placeholder="Search Here"
              placeholderTextColor="rgba(41, 128, 185,0.8)"
              returnKeyType="next"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              // onSubmitEditing = {() => this.passwordInput.focus()}
            />
            <TouchableOpacity>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={22}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <FlatList
            data={this.state.dealers}
            keyExtractor={(item, document_number) => document_number.toString()}
            renderItem={({item,}) => {
              console.log();
              console.log(item);
              if (item.verified == false) {
                console.log("true")
                return <DealerItem item={item} />;
              } else {
                console.log("false")
                return <DealerItem2 item={item} />;
              }
            }}
            // renderItem={({item}) => (
            //   <ListItem
            //     roundAvatar
            //     title={`${item.first_name} ${item.last_name}`}
            //     subtitle={item.document_number}
            //     leftAvatar={{source: {uri: item.face_image}}}
            //     containerStyle={{borderBottomWidth: 0}}
            //     badge={{
            //       value: 'new',
            //         textStyle: {color: 'white'},
            //         status: 'success',
            //     }}
            //     // {...renderIf(
            //     //   !item.verified,
            //     //     badge={
            //     //     value: 'new',
            //     //     textStyle: {color: 'white'},
            //     //     status: 'success',
            //     //   },
            //     // )}
            //     onPress={() => {
            //       navigate(item);
            //     }}
            //   />
            // )}
            // keyExtractor={item => item.date_of_expiry}
            // ItemSeparatorComponent={this.renderSeparator}
            // //   ListHeaderComponent={this.renderHeader}
            // ListFooterComponent={this.renderFooter}
            // onRefresh={this.handleRefresh}
            // refreshing={this.state.refreshing}
            // //   onEndReached={this.handleLoadMore}
            // //   onEndReachedThreshold={50}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    backgroundColor: colors.BG_MAIN_COVER,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  input: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    color: colors.WHITE,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
  },
  searchIcon: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  drawerIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  name: {
    width: Dimensions.get('screen').width - 50,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
