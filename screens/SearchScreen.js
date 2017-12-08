import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Picker, ScrollView } from 'react-native';
import CheckBox from 'react-native-checkbox';
import ArticleDisplay from '../components/ArticleDisplay';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Search',
    };

    constructor(props) {
      super(props);
      this.state = {searchFor: '',
                    articles: [],
                    searchIn: 'posts'};
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
      let results;

      // The view where the articles are displayed
      if(this.state.searchIn === 'posts'){
        results = this.state.articles.map((article) => {
          return <View key={article.id} style={styles.item}>
                  <ArticleDisplay 
                    onPressItem={() => navigate('Browse', {name: article.title.rendered})}
                    title={article.title.rendered}
                  >
                  </ArticleDisplay>
                </View>
        })
      } else if(this.state.searchIn === 'users'){
        results = this.state.articles.map((article) => {
          return <View key={article.id} style={styles.item}>
                  <ArticleDisplay title={article.name}></ArticleDisplay>
                </View>
        })
      }
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{padding: 10}}>
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
                  title="Search"/>
              <ScrollView>
                {results}
              </ScrollView>
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      height: 44,
    },
  })