import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FacebookUser from '../components/FacebookUser';
import FacebookLogin from '../components/FacebookLogin';
import styles from '../App';

export default class UserScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'User',
    };

    constructor(props) {
      super(props);
      this.state = {
        userLoggedIn: false,
        username: '',
        password: '',
        name: '',
        profilePic: ''
      };
    }

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <FacebookLogin/>
        </View>
      );
    }
  }