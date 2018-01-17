import React from 'react';
import { View, Text, Button } from 'react-native';

export default class FacebookLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
        username: "Login to see your name here"
    };
  }

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1895594347437838', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      this.setState({username: `Hi ${(await response.json()).name}!`});
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.username}</Text>
        <Button title="Login with Facebook" onPress={this.logIn.bind(this)}/>
      </View>
    );
  }
}