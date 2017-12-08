import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BrowseScreen from './screens/BrowseScreen';
import UserScreen from './screens/UserScreen';

const TabNav = TabNavigator({
  Home: { screen: HomeScreen,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={'https://www.theedgesusu.co.uk/wp-content/uploads/2017/01/The-Edge-Logo-Transparent.png'}
              style={[styles.icon, {tintColor: tintColor}]}
            />
          ) },
  Search: {screen: SearchScreen},
  User: {screen: UserScreen}
},{
  tabBarOptions: {
      activeTintColor: 'darkgray',
  }
});

const App = StackNavigator({
  Home: { screen: TabNav,
          navigationOptions: {
            title: 'The Edge App',
          },
        },
  Browse: {screen: BrowseScreen}
});


export default App;