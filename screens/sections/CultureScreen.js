import React from 'react';
import { Button, View } from 'react-native';

export default class CultureScreen extends React.Component {

  // Load the culture sub section screen
  onScreenChange(sectionTitle, section) {
    this.props.navigation.navigate('Section', {sectionTitle: sectionTitle, section: section, navigate: this.props.navigation});
  };
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Culture Articles" 
          onPress={this.onScreenChange("All Culture Articles", "culture")}/>
        <Button title="Theatre" onPress={this.onScreenChange("Theatre", "theatre")}/>
        <Button title="Television" onPress={this.onScreenChange("Television", "television")}/>
        <Button title="Video Games" onPress={this.onScreenChange("Video Games", "video-games")}/>
        <Button title="Literature" onPress={this.onScreenChange("Literature", "literature")}/>
      </View>
    );
  }
}