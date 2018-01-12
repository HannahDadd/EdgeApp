import React from 'react';
import { Text, View } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';

export default class ContentScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: "Section",
    };

    constructor(props) {
      super(props);
      this.state = {
        section: this.props.section,
        articles: []
      };
    }
  
    render() {
      results = this.state.articles.map((article) => {
        return 
          <View key={article.id}>
            <ArticleDisplay 
              onPressItem={() => navigate('Browse', {name: article.title})}
              title={article.title}
            />
          </View>
      })
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Text>{this.state.section}</Text>
          {results}
        </View>
      );
    }
  }