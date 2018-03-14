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

// Export cloud messaging token received when loaded
//const FCMToken = this.props.token;
const FCMToken = "hi";
export {FCMToken};

const TabNav = TabNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen },
  Search: {screen: SearchScreen},
  User: {screen: UserScreen}
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let icon;
      if (routeName === 'Home') {
        icon = require('../pictures/edge.png');
      } else if (routeName === 'Notifications') {
        icon = require('../pictures/notification.png');
      } else if (routeName === 'Search') {
        icon = require('../pictures/search.png');
      } else {
        icon = require('../pictures/userprofile.png');
      }

      // return icon for nav
      return <Image source={icon} style={{width: 50, height: 50}}/>;
    },
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
  }
});

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
      title: `${navigation.state.params.article.title.rendered}`,
    }),
  },
  BrowseArticles: {screen: BrowseArticlesScreen, 
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  }
});

export default App;
//AppRegistry.registerComponent('EdgeApp', () => App);
