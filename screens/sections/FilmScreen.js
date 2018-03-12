import React from 'react';
import { Button, View } from 'react-native';
import Styles from '../../Styles';

export default class FilmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Film Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "All Film Articles", postsURL: "film", isSection: true})}/>
        <Button title="Cinema"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Cinema Articles", postsURL: "cinema", isSection: true})}/>
        <Button title="Advice & Comment"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Advice & Comment Articles", postsURL: "advice-comment", isSection: true})}/>
        <Button title="Blu-Ray & DVD"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Blu-Ray & DVD Articles", postsURL: "dvd-bluray", isSection: true})}/>
     </View>
    );
  }
}