import React from 'react';
import { View, Text, Image } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      tabBarIcon: <Image
          source={{uri: 'https://www.theedgesusu.co.uk/wp-content/uploads/2017/01/The-Edge-Logo-Transparent.png'}}
          style={{width: 50, height:50}}
        />
    };

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Text>Content coming soon :P</Text>
        </View>
      );
    }
  }