import React from 'react';
import { View } from 'react-native';
import Styles from '../Styles';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

export default class FacebookLogin extends React.Component {

    loginFinished(error, result) {
        if (error) {
            // Login errored
        } else if (result.isCancelled) {
            // Login Cancelled
        } else {
            
        }
    }

    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={this.loginFinished.bind(this)}
                    onLogoutFinished={() => alert("User logged out")} />
            </View>
        );
    }
}