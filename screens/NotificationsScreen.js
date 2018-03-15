import React from 'react';
import { View, Text, Switch } from 'react-native';

export default class NotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Notifications',
      pushNotification: true
    };
    render() {
      //const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
            <Text style={Styles.sheet.titleText}>Notifications are </Text>
            <Switch onValueChange={(value) => this.setState({pushNotification: value})}/>
          </View>
        </View>
      );
    }
  }