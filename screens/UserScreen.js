import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import FacebookLogin from '../components/FacebookLogin';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import AuthorSignIn from '../components/AuthorSignIn';
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
        profilePic: '',
        sections: []
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
        if(result !== null){
          authors = JSON.parse(result).map((authorID) => {
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
        } else {
          authors = <Text style={Styles.sheet.subtitleText}>You're not following any authors :(</Text>
        }
      });
      // Get tags from the database and load them for display
      let tags;
      AsyncStorage.getItem('tag', (err, result) => {
        if(result !== null){
          tag = result.map((tagID) => {
            tag = this.getTagFromID(tagID);
            return <View key={tag.id} style={{flex: 1, flexDirection: 'column', padding: 10}}>
                      <Text onPress={() => navigate('BrowseArticles', 
                        {name: tag.name, postsURL: tag["_links"]["wp:post_type"][0].href})}
                        style={Styles.sheet.tagNavText}>{tag.name}
                      </Text>
                    </View>
          })
        } else {
          tags = <Text style={Styles.sheet.subtitleText}>You're not following any tags</Text>
        }
      });
      // Get sections from the database and load them for display
      let sections = <Text style={Styles.sheet.subtitleText}>You're not following any sections</Text>
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <AuthorSignIn/>
          <Text style={Styles.sheet.titleText}>Sections you're following:</Text>
          {sections}
          <Text style={Styles.sheet.titleText}>Tags you're following:</Text>
          {tags}
          <Text style={Styles.sheet.titleText}>Authors you're following:</Text>
          {authors}
        </View>
      );
    }
  }