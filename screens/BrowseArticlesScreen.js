import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import FollowButton from '../components/FollowButton';
import ArticleDisplay from '../components/ArticleDisplay';
import Styles from '../Styles';

export default class BrowseArticlesScreen extends React.Component {
    static navigationOptions = {
      title: "Articles",
    };

    constructor(props) {
      super(props);
      this.state = {
          name: this.props.navigation.state.params.name,
          postsURL: this.props.navigation.state.params.postsURL,
          articles: []
      };
    }

    // Get articles from tag on load
    componentDidMount(){
      if(this.state.postsURL !== undefined){
        fetch(this.state.postsURL + '&_embed', {
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
    }

    render() {
      const {navigate} = this.props.navigation;
      // If no search results are returned
      let results;
      if(this.state.articles.length < 1){
        results = 
          <Text>No Results for your search</Text>
      } else {
        // Loop through posts with that tag
        results = this.state.articles.map((article) => {
          // Check if there is a featured image to display
          let pic = '';
          // Must use typeof as any part of 'pic[0].media_details.sizes.medium.source_url' can be undefined 
          if(typeof article._embedded['wp:featuredmedia'] !== undefined){
            pic = article._embedded['wp:featuredmedia'];
            if(typeof pic[0] !== undefined && typeof pic[0].media_details !== undefined 
              && typeof pic[0].media_details.sizes !== undefined 
              && typeof pic[0].media_details.sizes.medium.source_url !== undefined) {
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
      }
      return (
        <ScrollView style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <FollowButton
            itemToFollow={this.state.name}
            category="tag"
            buttonTitle={"Follow " + this.state.name}/>
          {results}
        </ScrollView>
      );
    }
  }