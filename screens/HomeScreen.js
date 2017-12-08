import React from 'react';
import { Button } from 'react-native';
import { View } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={'https://www.theedgesusu.co.uk/wp-content/uploads/2017/01/The-Edge-Logo-Transparent.png'}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
    render() {
      //const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
        </View>
      );
    }
  }