import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import FollowButton from '../components/FollowButton';
import ArticleDisplay from '../components/ArticleDisplay';
import Styles from '../Styles';

export default class TagsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    // Get articles from url on load
    componentDidMount(){
    }

    // Set the articles based on the postURL
    getArticlesFromURL(){
      // Don't allow users to load more while loading content to avoid errors
      this.setState({currentlySearching: true});
      fetch(this.state.postsURL + '&offset=' + this.state.offset + '&_embed', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        this.setState({articles: this.state.articles.concat(responseJson)});
        this.setState({offset: this.state.offset + responseJson.length});
        this.setState({currentlySearching: false});
        if(responseJson.length === 0){
          this.setState({moreArticlesToLoad: false});
        }
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