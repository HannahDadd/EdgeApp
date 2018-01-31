import React from 'react';
import { Text, View } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';

export default class ContentScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //section: this.props.navigation.state.navigationOptions.title,
        articles: []
      };
    }
  
    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Text>Content coming soon!</Text>
        </View>
      );
    }
  }