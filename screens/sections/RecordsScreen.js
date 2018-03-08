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
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Records Articles", section: "records", navigate: this.state.navigate})}/>
        <Button title="Singles"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Singles Articles", section: "singles", navigate: this.state.navigate})}/>
        <Button title="Albums"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Albums Articles", section: "albums", navigate: this.state.navigate})}/>
        <Button title="Rewind"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Rewind Articles", section: "rewind", navigate: this.state.navigate})}/>
      </View>
    );
  }
}