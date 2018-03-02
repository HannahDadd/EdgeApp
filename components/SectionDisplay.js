import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import ArticleDisplay from './ArticleDisplay';
import Styles from '../Styles';

export default class SectionDisplay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        section: this.props.section,
        results: [],
        categoryID: ''
      };
    }

    // Get articles from url on load
    componentDidMount(){
      if(this.state.section !== undefined){
        // Get the section ID and from this get the articles
        this.getIDForSection();
      }
    }

    // Get the cateogory id from the name
    getIDForSection(){
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/categories?search=' + this.state.section, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if(responseJson[0] !== undefined){
          this.setState({categoryID: responseJson[0].id});
          this.getArticlesFromID(this.state.categoryID);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }

    // Get the article data for the category
    getArticlesFromID(sectionID){
      console.log("Sections id ", sectionID);
      fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?categories=' + sectionID + '&_embed', {
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
      // If no search results are returned
      let results;
      if(this.state.results.length < 1){
        results = 
          <Text>Loading Content...</Text>
      } else {
        console.log(this.state.results);
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
      }
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <ScrollView>
            {results}
          </ScrollView>
        </View>
      );
    }
  }