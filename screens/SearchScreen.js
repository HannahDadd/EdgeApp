import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Picker, ScrollView } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import Styles from '../Styles';

export default class SearchScreen extends React.Component {
    // static navigationOptions = {
    //   title: 'Search',
    // };

    constructor(props) {
      super(props);
      this.state = {
        searchFor: '',
        articles: [],
        searchIn: 'posts'
      };
    }

    // Query rest api for data- use fetch api
    getJSONData() {
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/' + this.state.searchIn + '?search=' + this.state.searchFor, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        this.setState({articles: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
    }

    render() {
      const {navigate} = this.props.navigation;

      // If no search results are returned
      let results;
      if(this.state.articles.length < 1){
        results = 
          <Text>No Results for your search</Text>
      }
      // Display article names and images
      else if(this.state.searchIn === 'posts'){
        results = this.state.articles.map((article) => {
          return <View key={article.id}>
                  <ArticleDisplay 
                    onPressItem={() => navigate('Browse', {name: article.title.rendered})}
                    title={article.title.rendered}
                  />
                </View>
        })
      // If search results are users display users with picture, name and bio
      } else if(this.state.searchIn === 'users'){
        results = this.state.articles.map((article) => {
          return <View key={article.id}>
                  <AuthorDisplay 
                    name={article.name}
                    bio={article.description}
                    profilePic={article.avatar_urls['24']}/>
                </View>
        })
      }
      return (
        <View style={Styles.sheet.viewStyle}>
            <TextInput
                style={{height: 40}}
                placeholder="Type here to search!"
                onChangeText={(text) => this.setState({searchFor:text})}
            />
            <Picker
              selectedValue={this.state.searchIn}
              onValueChange={(itemValue) => this.setState({searchIn: itemValue})}>
              <Picker.Item label="Post" value="posts" />
              <Picker.Item label="Author" value="users" />
            </Picker>
            <Button
                onPress={this.getJSONData.bind(this)}
                title="Search"
                color={Styles.buttonColour}/>
            <ScrollView style={{flex: 1, flexDirection: 'column', padding: 10}}>
              {results}
            </ScrollView>
        </View>
      );
    }
  }