import React from 'react';
import { View, Text, Image } from 'react-native';
//import FCM from "react-native-fcm";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fcm_token: ""
    };
  }

  // Get reccomeneded article for user
  getRecommendedArticle(){
    foundArticle = false;
    const tags = await AsyncStorage.getItem("viewedTags");
    const articlesRead = await AsyncStorage.getItem("viewedArticles"); 
    while(!foundArticle){
      // If they have not read any articles i.e. have no tags, suggest last article published      
      if (tags !== null && tags.length !== 0){
        // Go through all articles with first tag in list to find one to recommend
        getTaggedArticles(tags[0]).map((article) => {
          // If they've already read the article, don't recommend it
          if(articlesRead.indexOf(article.id) > -1){
            foundArticle = true;
            return <View key={article.id}
                      style={{flex: 1, flexDirection: 'column', padding: 10}}>
                    <Text>Content recently Published</Text>
                    <ArticleDisplay
                      title={article.title.rendered}
                      image={pic}
                      onPressItem={() => navigate('ShowArticle', {article: article, image: pic})}
                    />
                  </View> 
          }
        });
        // If article to recommend not found remove tag from list and try next tag in loop again
        var index = tags.indexOf(tag[0]);
        if (index > -1) {
          tags.splice(index, 1);
        }
      } else {
        // Return last article published
        foundArticle = true;
        return this.getLastArticlePublished();
      }
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
  getLastArticlePublished() {
    fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?per_page=1&_embed', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      // Check if there is a featured image to display
      article = responseJson[0];
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
              <Text>Content recently Published</Text>
              <ArticleDisplay
                title={article.title.rendered}
                image={pic}
                onPressItem={() => navigate('ShowArticle', {article: article, image: pic})}
              />
            </View>
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
  }

  // Onload add recomendation articles to feed
  

  static navigationOptions = {
    tabBarIcon: <Image
        source={{uri: 'https://www.theedgesusu.co.uk/wp-content/uploads/2017/01/The-Edge-Logo-Transparent.png'}}
        style={{width: 50, height:50}}
      />
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        {this.getRecommendedArticle.bind(this)}
      </View>
    );
  }
}