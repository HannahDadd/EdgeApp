import React from 'react';
import { Text, Image } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ShowArticleScreen from './screens/ShowArticleScreen';
import BrowseArticlesScreen from './screens/BrowseArticlesScreen';
import UserScreen from './screens/UserScreen';
import NotificationsScreen from './screens/NotificationsScreen';

// Section Screens
import FeaturesScreen from './screens/sections/FeaturesScreen';
import NewsScreen from './screens/sections/NewsScreen';
import CultureScreen from './screens/sections/CultureScreen';
import RecordsScreen from './screens/sections/RecordsScreen';
import FilmScreen from './screens/sections/FilmScreen';
import LiveScreen from './screens/sections/LiveScreen';

const TabNav = TabNavigator({
  Home: { screen: HomeScreen },
  Search: {screen: SearchScreen},
  User: {screen: UserScreen}
}, {
  tabBarOptions : {
    style: {
      backgroundColor: 'grey',
    }
}});

// Drawer that pops out with menu button
const DrawerNav = DrawerNavigator({
  Home: {screen: TabNav },
  News: {screen: NewsScreen},
  Live: {screen: LiveScreen },
  Culture: {screen: CultureScreen},
  Records: {screen: RecordsScreen },
  Features: {screen: FeaturesScreen },
  Film: {screen: FilmScreen }
});

const App = StackNavigator({
  Home: {
    screen: DrawerNav,
    navigationOptions: ({navigation}) => ({
      title: 'The Edge App',
      headerLeft: <Text onPress={() => 
        navigation.navigate('DrawerOpen')}>Menu</Text>,
      headerStyle: {backgroundColor: '#4C3E54'},
      headerTintColor: 'white'
    })
  },
  ShowArticle: {screen: ShowArticleScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.articleTitle}`,
    }),
  },
  BrowseArticles: {screen: BrowseArticlesScreen, 
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  }
});

export default App;