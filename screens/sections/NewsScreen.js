import React from 'react';
import { Button, View } from 'react-native';
import Styles from '../../Styles';

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button style={Styles.sheet.stackNavButton} title="All News Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {sectionTitle: "All Live Articles", postsURL: "live", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Notes on News"
          onPress={() => this.state.navigate('BrowseArticles', 
            {sectionTitle: "Notes On News Articles", postsURL: "notes-on-news", isSection: true})}/>
      </View>
    );
  }
}