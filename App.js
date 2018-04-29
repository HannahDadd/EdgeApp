import React from 'react';
import { Text, Image, View, TouchableHighlight, NativeModules } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ShowArticleScreen from './screens/ShowArticleScreen';
import BrowseArticlesScreen from './screens/BrowseArticlesScreen';
import UserScreen from './screens/UserScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import TagsScreen from './screens/TagsScreen';

// Section Screens
import FeaturesScreen from './screens/sections/FeaturesScreen';
import NewsScreen from './screens/sections/NewsScreen';
import CultureScreen from './screens/sections/CultureScreen';
import RecordsScreen from './screens/sections/RecordsScreen';
import FilmScreen from './screens/sections/FilmScreen';
import LiveScreen from './screens/sections/LiveScreen';

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
        icon = require('./pictures/home.png');
      } else if (routeName === 'Notifications') {
        icon = require('./pictures/notification.png');
      } else if (routeName === 'Search') {
        icon = require('./pictures/search.png');
      } else {
        icon = require('./pictures/userprofile.png');
      }

      // return icon for nav
      return <Image source={icon} style={{width: 20, height: 20}}/>;
    },
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'white'
		},
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
      title: 'The Edge',
      headerLeft: 
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('DrawerOpen')}>
              <Image source={require('./pictures/edge.png')} style={{width: 50, height: 25}}/>
          </TouchableHighlight>
      </View>,
      headerStyle: {backgroundColor: 'white'},
      headerTintColor: 'black',
      padding: 22
    })
  },
  ShowArticle: {screen: ShowArticleScreen,
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.article.title.rendered.replace(/&#.*;/, '')}`,
    }),
  },
  BrowseArticles: {screen: BrowseArticlesScreen, 
      navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.name}`,
    }),
  },
  Tags: {screen: TagsScreen, 
    navigationOptions: ({ navigation }) => ({
      title: `Tags for Article`,
    }),
  }
});

export default App;
//AppRegistry.registerComponent('EdgeApp', () => App);
