import React from 'react';
import { View, Text, Image, Switch, AsyncStorage, ScrollView } from 'react-native';
import {FCMToken} from '../App.js';
import Styles from '../Styles';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
//import FCM from "react-native-fcm";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fcm_token: FCMToken,
      pushNotification: false,
      articlesToDisplay: [],
      offset: 0
    };
  }

  // Get reccomeneded article for user
  async getRecommendedArticle(){
    numberOfArticelsFound = 0;
    try {
      const tags = await AsyncStorage.getItem("viewedTags");
      //console.log(tags.length);
      const articlesRead = await AsyncStorage.getItem("viewedArticles"); 
      while(numberOfArticelsFound !== 10){
        // If they have not read any articles i.e. have no tags, suggest last article published      
        if (tags !== null && tags.length !== 0){
          // Go through all articles with first tag in list to find one to recommend
          getTaggedArticles(tags[0]).map((article) => {
            // If they've already read the article, don't recommend it
            if(articlesRead.indexOf(article.id) > -1){
              this.setState({articlesToDisplay: this.state.articlesToDisplay.push(article)});;
            }
          });
          // If article to recommend not found remove tag from list and try next tag in loop again
          var index = tags.indexOf(tag[0]);
          if (index > -1) {
            tags.splice(index, 1);
          }
        } else {
          // Return last article published
          stillToFind = 10 - numberOfArticelsFound;
          numberOfArticelsFound = 10;
          this.getArticlesPublishedRecently(stillToFind);
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  // Get the tags JSON values
  getTaggedArticles(tagID) {
    fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?tags=' + tagID + '&_embed', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Get last article published
  getArticlesPublishedRecently(stillToFind) {
    fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?per_page=' + stillToFind + '&offset=' + this.state.offset + '&_embed', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      // Set offset
      this.setState({offset: this.state.offset++});
      this.setState({articlesToDisplay: this.state.articlesToDisplay.concat(responseJson)});

    })
    .catch(error => {
      console.error(error);
    });
  }

  componentDidMount () {
    // FCM.requestPermissions();
    // FCM.getFCMToken().then(token => {
    //   this.setState({fcm_token:token});
    //   //update your fcm token on server.
    // });
    this.registerForNotifications();
    this.getRecommendedArticle();
  }

  // Turn Push notifications on and send post to register device
  registerForNotifications(){
    fetch('http://theedgesusu.co.uk/pnfw/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.fcm_token,
        os: 'Android',
      }),
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    
    // Display the articles
    let articles = this.state.articlesToDisplay.map((article) => {
      // Check if there is a featured image to display
      let pic = '';
      // Must use typeof as any part of 'pic[0].media_details.sizes.medium.source_url' can be undefined 
      if(article && article._embedded && article._embedded['wp:featuredmedia'] !== undefined){
        pic = article._embedded['wp:featuredmedia'];
        if (pic[0].media_details && pic[0].media_details.sizes && pic[0].media_details.sizes.medium
          && pic[0].media_details.sizes.medium.source_url !== undefined){
          pic = pic[0].media_details.sizes.medium.source_url;
        }
      }
      return <View key={article.id}
                style={{flex: 1, flexDirection: 'column', padding: 10}}>
              <ArticleDisplay
                title={article.title.rendered}
                image={pic}
                onPressItem={() => navigate('ShowArticle', {article: article, image: pic})}
              />
            </View>
    })
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <ScrollView>
          {articles}
        </ScrollView>
      </View>
    );
  }
}