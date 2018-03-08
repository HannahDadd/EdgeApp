import React from 'react';
import { Button, View } from 'react-native';

export default class RecordsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Records Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "All Records Articles", postsURL: "records", isSection: true})}/>
        <Button title="Singles"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Singles Articles", postsURL: "singles", isSection: true})}/>
        <Button title="Albums"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Albums Articles", postsURL: "albums", isSection: true})}/>
        <Button title="Rewind"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Rewind Articles", postsURL: "rewind", isSection: true})}/>
      </View>
    );
  }
}