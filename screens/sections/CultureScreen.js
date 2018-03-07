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
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Culture Articles", section: "culture", navigate: this.state.navigate})}/>
        <Button title="Theatre"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Theatre Articles", section: "theatre", navigate: this.state.navigate})}/>
        <Button title="Television"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Television Articles", section: "television", navigate: this.state.navigate})}/>
        <Button title="Video Games"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Video Games Articles", section: "video-games", navigate: this.state.navigate})}/>
        <Button title="Literature"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Literature Articles", section: "literature", navigate: this.state.navigate})}/>
      </View>
    );
  }
}