import React from 'react';
import { Text, Image } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ShowArticleScreen from './screens/ShowArticleScreen';
import BrowseArticlesScreen from './screens/BrowseArticlesScreen';
import UserScreen from './screens/UserScreen';
import ContentScreen from './screens/ContentScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const TabNav = TabNavigator({
  Home: { screen: HomeScreen },
  Search: {screen: SearchScreen},
  User: {screen: UserScreen},
  Notifications: {screen: NotificationsScreen}
}, {
  tabBarOptions : {
    style: {
      backgroundColor: 'grey',
    }
}});

const DrawerNav = DrawerNavigator({
  Home: {screen: TabNav },
  Features: {screen: ContentScreen,
    navigationOptions: {
      title: 'Features'
    }
  }
});

const App = StackNavigator({
  Home: {screen: DrawerNav,
    navigationOptions: ({navigation}) => ({
      title: 'The Edge App',
      headerLeft: <Text onPress={() => 
        navigation.navigate('DrawerOpen')}>Menu</Text>,
      headerStyle: {backgroundColor: '#4C3E54'},
      headerTintColor: 'white'
    })
  },
  ShowArticle: {screen: ShowArticleScreen},
  BrowseArticles: {screen: BrowseArticlesScreen}
}); 

export default App;