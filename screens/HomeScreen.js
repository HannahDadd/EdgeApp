import React from 'react';
import { Button } from 'react-native';
import { View } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Home',
    };

    render() {
      //const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
        </View>
      );
    }
  }