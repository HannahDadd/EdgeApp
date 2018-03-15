import React from 'react';
import { Text, View, Picker, Image, Button, ScrollView, AsyncStorage, Switch, WebView } from 'react-native';
import AuthorDisplay from '../components/AuthorDisplay';
import ArticleText from '../components/ArticleText';
import EdgeSocialLinks from '../components/EdgeSocialLinks';
import Styles from '../Styles';

export default class ShowArticleScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.article.title.rendered,
      image: this.props.navigation.state.params.image,
      content: this.props.navigation.state.params.article.content.rendered,
      author: this.props.navigation.state.params.article.author,
      authorName: '',
      authorBio: '',
      authorPic: '',
      section: '',
      tagIDs: this.props.navigation.state.params.article.tags,
      tags: [],
      link: this.props.navigation.state.params.article.guid.rendered,
      nightmode: false
    };
  }

  // Share this article to FB
  // shareToFacebook(){
  //   const shareLinkContent = {
  //     contentType: 'link',
  //     contentUrl: this.state.link,
  //     contentDescription: '',
  //   };
  //   ShareApi.canShare(this.state.shareLinkContent).then(
  //     tmp = this;
  //     function(canShare) {
  //       if (canShare) {
  //         return ShareApi.share(tmp.state.shareLinkContent, '/me', 'Some message.');
  //       }
  //     }
  //   ).then(
  //     function(result) {
  //       alert('Share operation with ShareApi was successful');
  //     },
  //     function(error) {
  //       alert('Share with ShareApi failed with error: ' + error);
  //     }
  //   );
  // }

  // Fetch data from the api
  getJSONData(searchIn, searchFor, callBack) {
    fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/' + searchIn + '?search=' + searchFor + '&_embed', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      callBack(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Query rest api for data- use fetch api
  componentDidMount() {
    // Set article as read
    this.addArticleIDtoReadArticles(this.state.id);
    // Get author
    this.getJSONData('users', this.state.author, 
      function(responseJson) {
        if(responseJson && responseJson[0] !== undefined){
          this.setState(
            {authorName: responseJson[0].name,
            authorBio: responseJson[0].description,
            authorPic: responseJson[0]['avatar_urls'][96]
          });
        }
      }.bind(this)
    );
    // Get tags from id
    let tags = []
    for (var i = 0; i <  this.state.tagIDs.length; i++) {
      let key = this.state.tagIDs[i];
      this.getJSONData('tags', this.state.tagIDs[i], 
        function(responseJson) {
          if(responseJson && responseJson[0] !== undefined){
            tags.push({key: key, name: responseJson[0].name});
            // Store tags of articles user is interested in for reccomendations
            this.addTagIdToRecommender(key);
          }
        }.bind(this)
      );
    }
    this.setState({tags: tags})
  }

  // Add read articles to datastore so they are not recommended articles they have already read
  async addArticleIDtoReadArticles(articleID){
    // Check if they are already following this tag, author or section
    try {
      const value = await AsyncStorage.getItem("viewedArticles");
      if (value !== null){ 
        // Add new tag author or section to db
        AsyncStorage.mergeItem("viewedArticles", JSON.stringify(articleID), () => {
        // Item is added to datastore
        });
      } else {
        // Update what they are following
        AsyncStorage.setItem("viewedArticles", articleID, () => {
        // The item should now be added to the db
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  async addTagIdToRecommender(tagID){
    try {
      // If they are following the tag, don't recommend it
      const tagsFollowing = await AsyncStorage.getItem("tags");
      if (tagsFollowing === null || tagsFollowing.indexOf(tagID) < 0){
        const value = await AsyncStorage.getItem("viewedTags");
        if (value !== null){ 
            // Add new tag author or section to db
          AsyncStorage.mergeItem("viewedTags", JSON.stringify(tagID), () => {
              // Item is added to datastore
          });
        } else {
            // Update what they are following
          AsyncStorage.setItem("viewedTags", tagID, () => {
                // The item should now be added to the db
          });
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    // Check if there is a featured image to display
    var icon;
    if(String(this.state.image) && this.state.image.includes('http')){
      icon = {uri: this.state.image};
    } else {
      icon = require('../pictures/noimage.jpg');
    }
    // Remove html tags from content .replace(/<(?:.|\n)*?>/gm, '')
    var content = this.state.content + "<Image source={" + icon + "} style={{width: 350, height: 200}}/>";
    // Add tags to the picker
    let tags = this.state.tags.map((tag) => {
      return <View key={tag.key} style={{flex: 1, flexDirection: 'column', padding: 10}}>
              <Text onPress={() => navigate('BrowseArticles', 
                {name: tag.name, postsURL: tag["_links"]["wp:post_type"][0].href})}
                style={Styles.sheet.tagNavText}>{tag.name}
              </Text>
            </View>
    })
    let viewStyle = {flex: 1, backgroundColor: 'white'};
    if(this.state.nightmode){
      viewStyle = {flex: 1, backgroundColor: '#FFE299'};
    }
    let height = content.split(" ").length/8;
    console.log({html: content});
    return (
      <View style={viewStyle}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={Styles.sheet.subtitleText}>Night Mode:</Text>
          <View>
            <Switch value={this.state.nightmode} onValueChange={(value) => this.setState({nightmode: value})}/>
          </View>
          <Button color={Styles.buttonColour} title="See Author" 
            onPress={() => navigate('BrowseArticles', {name: this.state.authorName, id: this.state.author,
                        postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + this.state.author + '&_embed'})}/>
          <Button color={Styles.buttonColour} title="See Tags" 
            onPress={() => navigate('Tags')}/>              
        </View>
        <WebView id={"webview"} source={{html: content}} style = {{height:height, marginTop : 20}}/>
        </View>
    );
  }
}