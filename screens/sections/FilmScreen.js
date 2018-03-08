import React from 'react';
import { Button, View } from 'react-native';

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
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Film Articles", section: "film", navigate: this.state.navigate})}/>
        <Button title="Cinema"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Cinema Articles", section: "cinema", navigate: this.state.navigate})}/>
        <Button title="Advice & Comment"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Advice & Comment Articles", section: "advice-comment", navigate: this.state.navigate})}/>
        <Button title="Blu-Ray & DVD"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Blu-Ray & DVD Articles", section: "dvd-bluray", navigate: this.state.navigate})}/>
     </View>
    );
  }
}