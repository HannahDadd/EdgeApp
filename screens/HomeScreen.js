import React from 'react';
import { Button } from 'react-native';
import { View } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Button title="Search" onPress={() => navigate('Search') } />
          </View>
        </View>
      );
    }
  }