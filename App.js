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
import InterviewsScreen from './screens/sections/InterviewsScreen';
import IntroducingScreen from './screens/sections/IntroducingScreen';

import NewsScreen from './screens/sections/NewsScreen';
import NotesOnNewsScreen from './screens/sections/NotesOnNewsScreen';

import CultureScreen from './screens/sections/CultureScreen';
import TheatreScreen from './screens/sections/TheatreScreen';
import TelevisionScreen from './screens/sections/TelevisionScreen';
import VideoGamesScreen from './screens/sections/VideoGamesScreen';
import LiteratureScreen from './screens/sections/LiteratureScreen';

import RecordsScreen from './screens/sections/RecordsScreen';
import SinglesScreen from './screens/sections/SinglesScreen';
import AlbumsScreen from './screens/sections/AlbumsScreen';
import RewindScreen from './screens/sections/RewindScreen';

import FilmScreen from './screens/sections/FilmScreen';
import CinemaScreen from './screens/sections/CinemaScreen';
import ArchiveCommentScreen from './screens/sections/ArchiveCommentScreen';
import DVDBluRayScreen from './screens/sections/DVDBluRayScreen';

import LiveScreen from './screens/sections/LiveScreen';
import FestivalsScreen from './screens/sections/FestivalsScreen';
import ComedyScreen from './screens/sections/ComedyScreen';
import LocalMusicScreen from './screens/sections/LocalMusicScreen';
import ReviewsScreen from './screens/sections/ReviewsScreen';
import PreviewsScreen from './screens/sections/PreviewsScreen';

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

// Tab navs for each section with subsections in
const LiveTabNav = TabNavigator({
  All: { screen: LiveScreen },
  Festivals: {screen: FestivalsScreen},
  Comedy: {screen: ComedyScreen},
  LocalMusic: {screen: LocalMusicScreen},
  Reviews: {screen: ReviewsScreen},
  Previews: {screen: PreviewsScreen}
});
const FeaturesTabNav = TabNavigator({
  All: { screen: FeaturesScreen },
  Interviews: {screen: InterviewsScreen},
  Introducing: {screen: IntroducingScreen}
});
const FilmTabNav = TabNavigator({
  All: { screen: FilmScreen },
  Cinema: {screen: CinemaScreen},
  ArchiveComment: {screen: ArchiveCommentScreen},
  DVDBluRay: {screen: DVDBluRayScreen}
});
const RecordsTabNav = TabNavigator({
  All: { screen: RecordsScreen },
  Singles: {screen: SinglesScreen},
  Albums: {screen: AlbumsScreen},
  Rewind: {screen: RewindScreen}
});
const CultureTabNav = TabNavigator({
  All: { screen: CultureScreen },
  Theatre: {screen: TheatreScreen},
  Television: {screen: TelevisionScreen},
  VideoGames: {screen: VideoGamesScreen},
  Literature: {screen: LiteratureScreen}
});
const NewsTabNav = TabNavigator({
  All: { screen: NewsScreen },
  NotesOnNews: {screen: NotesOnNewsScreen}
});

// Drawer that pops out with menu button
const DrawerNav = DrawerNavigator({
  Home: {screen: TabNav },
  News: {screen: NewsTabNav,
    navigationOptions: {
      title: 'News'
    }
  },
  Live: {screen: LiveTabNav,
    navigationOptions: {
      title: 'Live'
    }
  },
  Culture: {screen: CultureTabNav,
    navigationOptions: {
      title: 'Culture'
    }
  },
  Records: {screen: RecordsTabNav,
    navigationOptions: {
      title: 'Records'
    }
  },
  Features: {screen: FeaturesTabNav,
    navigationOptions: {
      title: 'Features'
    }
  },
  Film: {screen: FilmTabNav,
    navigationOptions: {
      title: 'Film'
    }
  }
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
  ShowArticle: {screen: ShowArticleScreen},
  BrowseArticles: {screen: BrowseArticlesScreen}
});

export default App;