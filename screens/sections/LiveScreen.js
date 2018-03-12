import React from 'react';
import { Button, View } from 'react-native';
import Styles from '../../Styles';

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
        <Button style={Styles.sheet.stackNavButton} title="All Live Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Live", postsURL: "live", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Festivals"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Festival", postsURL: "festival", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Comedy"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Comedy", section: "comedy", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Local Music"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Local-Music", postsURL: "local-music", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Reviews"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Reviews", postsURL: "reviews", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Previews"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Previews", postsURL: "previews", isSection: true})}/>
      </View>
    );
  }
}