import React from 'react';
import { Text } from 'react-native';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Search',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Text>HI</Text>
      );
    }
  }