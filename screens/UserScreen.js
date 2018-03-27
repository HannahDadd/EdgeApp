import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
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
        authors: [],
        sections: []
      };
    }

    // When the component mounts find all authors and populate the list of authors they're following
    componentDidMount(){
      this.getAuthors();
      this.getTagsSectionName();
    }

    // Get the tags and sections names they are following
    async getTagsSectionName(){
      try {
        AsyncStorage.getItem('titles', (err, dbResult) => {
          result = JSON.parse(dbResult);
          if(result !== null){
            this.setState({sections: result});
          }
        });
      } catch (error) {
        // Error retrieving data
        console.log(error)
      }
    }

    // Get authors from db and put in array
    async getAuthors(){
      try {
        AsyncStorage.getItem('author', (err, authorResult) => {
          authors = [];
          result = JSON.parse(authorResult);
          if(result !== null){
            result.map((authorID) => {
              authors.push(this.getAuthorFromID(authorID));
            })
          }
          this.setState({authors: authors});
        });
      } catch (error) {
        // Error retrieving data
        console.log(error)
      }
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
      this.getAuthors();
      this.getTagsSectionName();
      // Get Authors from the database and load them for display
      let authors;
      if(this.state.authors.length === 0){
        authors = <Text style={Styles.sheet.subtitleText}>You're not following any authors</Text>
      } else {
        authors = <Text style={Styles.sheet.subtitleText}>You're not following any authors</Text>
        // authors = this.state.authors.map((author) => {
        //   return <View key={author.id} style={{flex: 1, flexDirection: 'column', padding: 10}}>
        //             <AuthorDisplay
        //               name={author.name}
        //               id={author.id}
        //               bio={author.description}
        //               pic={author['avatar_urls'][96]}
        //               onPressItem={() => navigate('BrowseArticles', {name: author.name, id: author.id,
        //                 postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + author.id + '&_embed'})}
        //             />
        //           </View>
        // });
      }
      // Get tags and sections they're following
      let tags;
      if(this.state.sections.length === 0){
        tags = <Text style={Styles.sheet.subtitleText}>You're not following any tags or sections</Text>
      } else {
        tags = this.state.sections.map((tag) => {
          return <Text style={Styles.sheet.subtitleText}>tag</Text>
        });
      }
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <ScrollView>
            <View style={Styles.sheet.boarderedColouredColView}>
              <Text style={Styles.sheet.titleText}>Sections and Tags you're following:</Text>
              {tags}
            </View>
            <View style={Styles.sheet.boarderedColouredColView}>
              <Text style={Styles.sheet.titleText}>Authors you're following:</Text>
              {authors}
            </View>
            <AuthorSignIn/>
          </ScrollView>
        </View>
      );
    }
  }