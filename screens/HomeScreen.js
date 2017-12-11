import React from 'react';
import { View, Text } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Home',
    };

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Text>Content coming soon :P</Text>
        </View>
      );
    }
  }