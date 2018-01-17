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
          <FacebookLogin/>
        </View>;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          {facebookLogin}
        </View>
      );
    }
  }