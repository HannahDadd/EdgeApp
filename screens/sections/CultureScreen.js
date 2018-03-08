import React from 'react';
import { Button, View } from 'react-native';

export default class CultureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Culture Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "All Culture Articles", postsURL: "culture", isSection: true})}/>
        <Button title="Theatre"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Theatre Articles", postsURL: "theatre", isSection: true})}/>
        <Button title="Television"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Television Articles", postsURL: "television", isSection: true})}/>
        <Button title="Video Games"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Video Games Articles", postsURL: "video-games", isSection: true})}/>
        <Button title="Literature"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Literature Articles", postsURL: "literature", isSection: true})}/>
      </View>
    );
  }
}