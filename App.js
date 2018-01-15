import React from 'react';
import { Text, Image } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ShowArticleScreen from './screens/ShowArticleScreen';
import ShowTagContentScreen from './screens/ShowTagContentScreen';
import UserScreen from './screens/UserScreen';
import ContentScreen from './screens/ContentScreen';

const TabNav = TabNavigator({
  Home: { screen: HomeScreen },
  Search: {screen: SearchScreen},
  User: {screen: UserScreen}
},{
  tabBarOptions: {
      activeTintColor: 'darkgray',
  }
});

const StackNav = StackNavigator({
  Home: {screen: TabNav,
    navigationOptions: {
      title: 'The Edge App',
    },
  },
  ShowArticle: {screen: ShowArticleScreen},
  ShowTagContent: {screen: ShowTagContentScreen}
});

const App = DrawerNavigator({
  Home: {screen: StackNav },
  Features: {screen: ContentScreen,
    navigationOptions: {
      title: 'Features'
    }
  }
});

export default App;