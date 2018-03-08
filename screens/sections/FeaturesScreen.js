import React from 'react';
import { Button, View } from 'react-native';

export default class FeaturesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Features Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "All Features Articles", postsURL: "features", isSection: true})}/>
        <Button title="Interviews"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Interviews Articles", postsURL: "interviews", isSection: true})}/>
        <Button title="Introducing"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Introducing Articles", postsURL: "introducing", isSection: true})}/>
      </View>
    );
  }
}