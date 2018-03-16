import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import FollowButton from '../components/FollowButton';
import ArticleDisplay from '../components/ArticleDisplay';
import Styles from '../Styles';

export default class TagsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tagIDs: this.props.navigation.state.params.tagIDs,
      };
    }

    // Get tags from IDs on load
    componentDidMount(){
    }

    // Set the articles based on the postURL
    getTagsFromURL(tagID){
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags/' + this.state.tagID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        
      })
      .catch(error => {
          console.error(error);
      });
    }

    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        </View>
      );
    }
  }