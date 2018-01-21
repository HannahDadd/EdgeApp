import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FacebookLogin from '../components/FacebookLogin';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import Styles from '../Styles';

export default class UserScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'User',
    };

    constructor(props) {
      super(props);
      this.state = {
        userLoggedIn: false,
        username: '',
        password: '',
        name: '',
        profilePic: ''
      };
    }

    // Method to get author from author id
    getAuthorFromID(authorID){
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/users?search=' + authorID + '&_embed', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        return responseJson[0];
      })
      .catch(error => {
        console.error(error);
      });
    }

    // Method to get tag from tag id
    getTagFromID(tagID){
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags?search=' + tagID + '&_embed', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        return responseJson[0];
      })
      .catch(error => {
        console.error(error);
      });
    }

    render() {
      // Get Authors from the database and load them for display
      let authors;
      AsyncStorage.getItem('author', (err, result) => {
        authors = result.map((authorID) => {
          author = this.getAuthorFromID(authorID);
          return <View key={author.id} style={{flex: 1, flexDirection: 'column', padding: 10}}>
                    <AuthorDisplay
                      name={author.name}
                      id={author.id}
                      bio={author.description}
                      pic={author['avatar_urls'][96]}
                      onPressItem={() => navigate('BrowseArticles', {name: author.name, 
                        postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + author.id + '&_embed'})}
                    />
                  </View>
        })
      });
      // Get tags from the database and load them for display
      let tags;
      AsyncStorage.getItem('tag', (err, result) => {
        tag = result.map((tagID) => {
          tag = this.getTagFromID(tagID);
          return <View key={tag.id} style={{flex: 1, flexDirection: 'column', padding: 10}}>
                    <Text onPress={() => navigate('BrowseArticles', 
                      {name: tag.name, postsURL: tag["_links"]["wp:post_type"][0].href})}
                      style={Styles.sheet.titleText}>{tag.name}
                    </Text>
                   </View>
        })
      });
      // Get sections from the database and load them for display
      let sections;
      AsyncStorage.getItem('section', (err, result) => {
        sections = result.map((section) => {
          return <Text>{section}</Text>
        })
      });
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <FacebookLogin/>
          <Text>Sections you're following:</Text>
          {sections}
          <Text>Tags you're following:</Text>
          {tags}
          <Text>Authors you're following:</Text>
          {authors}
        </View>
      );
    }
  }