import React from 'react';
import { Text } from 'react-native';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Browse',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Text>Lets load some content</Text>
      );
    }
  }