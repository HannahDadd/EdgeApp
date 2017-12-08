import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BrowseScreen from './screens/BrowseScreen';

const App = TabNavigator({
  Home: { screen: HomeScreen },
  Search: {screen: SearchScreen}
},{
  tabBarOptions: {
      activeTintColor: '#222',
  }
});

const SecionNav = StackNavigator({
  Search: {screen: SearchScreen},
  Browse: {screen: BrowseScreen}
});


export default App;