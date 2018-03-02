import React from 'react';
import { Text, View, Picker, Image, Button, ScrollView, WebView } from 'react-native';
import AuthorDisplay from '../components/AuthorDisplay';
import ArticleText from '../components/ArticleText';
import EdgeSocialLinks from '../components/EdgeSocialLinks';
import Styles from '../Styles';

export default class ShowArticleScreen extends React.Component {
    static navigationOptions = {
      title: "Read Article",
    };

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
        tags: this.props.navigation.state.params.article.tags
      };
    }

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
        callBack(responseJson)
      })
      .catch(error => {
        console.error(error);
      });
    }

    // Query rest api for data- use fetch api
    componentDidMount() {
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
      console.log("length ", this.state.tags.length);
      for (var i = 0; i <  this.state.tags.length; i++) {
        console.log(this.state.tags[i]);
        let key = this.state.tags[i];
        this.getJSONData('tags', this.state.tags[i], 
          function(responseJson) {
            if(responseJson && responseJson[0] !== undefined){
              tags.push({key: key, name: responseJson[0].name});
            }
          }.bind(this)
        );
      }
      console.log(tags);
      this.setState({tags: tags})
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
      // Remove html tags from content
      var content = this.state.content.replace(/<(?:.|\n)*?>/gm, '');
      // Add tags to the picker
      let tags = this.state.tags.map((tag) => {
        console.log("hello ", tag.key);
        return <View key={tag.key} style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <Text onPress={() => navigate('BrowseArticles', 
                  {name: tag.name, postsURL: tag["_links"]["wp:post_type"][0].href})}
                  style={Styles.sheet.titleText}>{tag.name}
                </Text>
              </View>
      })
      return (
        <ScrollView style={{flexDirection: 'column', padding: 10}}>
          <View>
            <Image source={icon} style={{width: 350, height: 200}}/>
            <Text style={Styles.sheet.titleText}>{this.state.title}</Text>
            <ArticleText/>
            <Text>{content}</Text>
            <Text>{this.state.section}</Text>
            <AuthorDisplay
              name={this.state.authorName}
              id={this.state.author}
              bio={this.state.authorBio}
              profilePic={this.state.authorPic}
            />
            <Text>Article Tags:</Text>
            {tags}
          </View>
        </ScrollView>
      );
    }
  }