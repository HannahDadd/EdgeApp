import React from 'react';
import { Text } from 'react-native';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Browse',
    };
    
    state = {
        text: "", 
    }

    // Find the data from the RSS Feed
    componentDidMount() {
    //     var Feed = require('rss-to-json');
        
    //    Feed.load('https://www.theedgesusu.co.uk/feed/', function(err, rss){
    //        this.state = rss;
    //    });
    }

    render() {
      const { navigate } = this.props.navigation;
      return (
        <Text>this.state.text</Text>
      );
    }
  }