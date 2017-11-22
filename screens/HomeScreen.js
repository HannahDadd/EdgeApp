import React from 'react';
import { Button } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button title="Search" onPress={() => navigate('Search') } />,
        <Button title="Browse" onPress={() => navigate('Browse') } />
      );
    }
  }