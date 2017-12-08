import React from 'react';
import { Text } from 'react-native';

export default class BrowseScreen extends React.Component {
    static navigationOptions = {
      title: "Browse",
    };

    constructor(props) {
        super(props);
        this.state = {title: this.props.name};
      }

    render() {
      const { navigate } = this.props.navigation;
      return (
        <Text>{this.props.navigation.state.params.name}</Text>
      );
    }
  }