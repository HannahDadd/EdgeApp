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
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Live Articles", section: "live", navigate: this.state.navigate})}/>
        <Button title="Festivals"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Festival Articles", section: "festival", navigate: this.state.navigate})}/>
        <Button title="Comedy"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Comedy Articles", section: "comedy", navigate: this.state.navigate})}/>
        <Button title="Local Music"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Local Music Articles", section: "local-music", navigate: this.state.navigate})}/>
        <Button title="Reviews"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Reviews Articles", section: "reviews", navigate: this.state.navigate})}/>
        <Button title="Previews"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Previews Articles", section: "previews", navigate: this.state.navigate})}/>
      </View>
    );
  }
}