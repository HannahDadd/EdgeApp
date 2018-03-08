import React from 'react';
import { Button, View } from 'react-native';

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
        <Button title="All News Articles" 
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Live Articles", section: "live", navigate: this.state.navigate})}/>
        <Button title="Notes on News"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Notes On News Articles", section: "notes-on-news", navigate: this.state.navigate})}/>
      </View>
    );
  }
}