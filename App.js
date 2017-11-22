import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BrowseScreen from './screens/BrowseScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Search: {screen: SearchScreen},
  Browse: {screen: BrowseScreen}
});

export default App;