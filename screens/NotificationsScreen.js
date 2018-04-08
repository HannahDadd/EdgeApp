import React from 'react';
import { View, Text, Switch } from 'react-native';

export default class NotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Notifications',
      pushNotification: true
    };

    constructor(props) {
      super(props);
  
      this.state = {
      }
    }

    render() {
      //const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={Styles.sheet.subtitleText}>Notifications:</Text>
            <View>
              <Switch onValueChange={(value) => this.setState({pushNotification: value})}/>
            </View>
          </View>
        </View>
      );
    }
  }