import React from 'react';
import { Button, View } from 'react-native';

export default class LiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Live Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Live", postsURL: "live", isSection: true})}/>
        <Button title="Festivals"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Festival", postsURL: "festival", isSection: true})}/>
        <Button title="Comedy"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Comedy", section: "comedy", isSection: true})}/>
        <Button title="Local Music"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Local-Music", postsURL: "local-music", isSection: true})}/>
        <Button title="Reviews"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Reviews", postsURL: "reviews", isSection: true})}/>
        <Button title="Previews"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Previews", postsURL: "previews", isSection: true})}/>
      </View>
    );
  }
}