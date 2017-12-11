import React from 'react';
import { View } from 'react-native';

export default class NotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'User',
    };
    render() {
      //const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
        </View>
      );
    }
  }