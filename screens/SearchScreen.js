import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Picker, ScrollView } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import Styles from '../Styles';

export default class SearchScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchFor: '',
        results: [],
        searchIn: 'posts'
      };
    }

    // Query rest api for data- use fetch api
    getJSONData() {
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/' + this.state.searchIn + '?search=' + this.state.searchFor + '&_embed', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        this.setState({results: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
    }

    render() {
      const {navigate} = this.props.navigation;

      // If no search results are returned
      let results;
      if(this.state.results.length < 1){
        results = 
          <Text>No Results for your search</Text>
      }
      // Display article names and images
      else if(this.state.searchIn === 'posts'){
        results = this.state.results.map((article) => {
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
      // If search results are users display users with picture, name and bio
      } else if(this.state.searchIn === 'users'){
        results = this.state.results.map((author) => {
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
      // Display any potential tags
      } else if(this.state.searchIn === 'tags'){
        results = this.state.results.map((tag) => {
          return <View key={tag.id} style={{flex: 1, flexDirection: 'column', padding: 10}}>
                    <Text onPress={() => navigate('BrowseArticles', 
                      {name: tag.name, postsURL: tag["_links"]["wp:post_type"][0].href})}
                      style={Styles.sheet.titleText}>{tag.name}
                    </Text>
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
              <Picker.Item label="Tag" value="tags" />
            </Picker>
            <Button
                onPress={this.getJSONData.bind(this)}
                title="Search"
                color={Styles.buttonColour}/>
            <ScrollView>
              {results}
            </ScrollView>
        </View>
      );
    }
  }