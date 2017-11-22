import React from 'react';
import { Text } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Text>Hello world!</Text>
      );
    }
  }