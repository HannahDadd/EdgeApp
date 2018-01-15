import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FacebookUser from '../components/FacebookUser';
import FacebookLogin from '../components/FacebookLogin';
import styles from '../App';

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
// } = FBSDK;

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

    // Search facebook API and return user if looged in
    attemptLogin(){
      // TODO add facebook login
    }

    render() {
      let facebookLogin = 
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Text>Login with Facebook:</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Username"
            onChangeText={(text) => this.setState({username:text})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Password"
            onChangeText={(text) => this.setState({password:text})}
          />
          <Button
            onPress={this.attemptLogin.bind(this)}
            title="Login"/>
        </View>;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          {facebookLogin}
        </View>
      );
    }
  }