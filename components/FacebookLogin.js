import React from 'react';
import { View, Text } from 'react-native';
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
            // Log out button will replace login button
        }
    }

    render() {
        return (
            <View style={Styles.sheet.boarderedColouredColView}>
                <Text style={Styles.sheet.subtitleText}>Have Facebook? Login to share articles automatically!</Text>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={this.loginFinished.bind(this)}
                    onLogoutFinished={() => alert("User logged out")} />
            </View>
        );
    }
}