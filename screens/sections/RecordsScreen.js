import React from 'react';
import { Button, View } from 'react-native';
import Styles from '../../Styles';

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
        <Button style={Styles.sheet.stackNavButton} title="All Records Articles" 
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "All Records Articles", postsURL: "records", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Singles"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Singles Articles", postsURL: "singles", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Albums"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Albums Articles", postsURL: "albums", isSection: true})}/>
        <Button style={Styles.sheet.stackNavButton} title="Rewind"
          onPress={() => this.state.navigate('BrowseArticles', 
            {name: "Rewind Articles", postsURL: "rewind", isSection: true})}/>
      </View>
    );
  }
}