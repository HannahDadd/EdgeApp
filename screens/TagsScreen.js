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
        tagNames: []
      };
    }

    // Get tags from IDs on load
    componentDidMount(){
      console.log(this.state.tagIDs);
      for (var i = 0; i < this.state.tagIDs.length; i++) {
        this.getTagsFromURL(this.state.tagIDs[i] + "");
      }
    }

    // Set the articles based on the postURL
    getTagsFromURL(tagID){
      console.log('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags/' + tagID);
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags/' + tagID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
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