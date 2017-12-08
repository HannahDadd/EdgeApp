import React from 'react';
import { Text, TextInput, View, FlatList, StyleSheet, Button } from 'react-native';
import CheckBox from 'react-native-checkbox';
import ArticleDisplay from '../components/ArticleDisplay';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Search',
    };

    constructor(props) {
      super(props);
      this.state = {searchFor: '',
                    articles: []};
    }

    // Query rest api for data- use fetch api
    getJSONData() {
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts' + '?search=' + 'hannah', {
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
      const { navigate } = this.props.navigation;

      // The view where the articles are displayed
      let results = this.state.articles.map((article) => {
        return <View key={article.id} style={styles.item}>
                <ArticleDisplay title={article.title.rendered}></ArticleDisplay>
              </View>
      })
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{padding: 10}}>
              <TextInput
                  style={{height: 40}}
                  placeholder="Type here to search!"
                  onChangeText={(text) => this.setState({searchFor:text})}
              />
              <Button
                  onPress={this.getJSONData.bind(this)}
                  title="Search"/>
              {results}
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
      fontSize: 18,
      height: 44,
    },
  })