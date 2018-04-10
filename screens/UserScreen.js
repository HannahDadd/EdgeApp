import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import FacebookLogin from '../components/FacebookLogin';
import AuthorSignIn from '../components/AuthorSignIn';
import Styles from '../Styles';

export default class UserScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'User',
    };

    constructor(props) {
      super(props);
      this.state = {
        userLoggedIn: false
      };
    }

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <ScrollView>
            <AuthorSignIn/>
          </ScrollView>
        </View>
      );
    }
  }