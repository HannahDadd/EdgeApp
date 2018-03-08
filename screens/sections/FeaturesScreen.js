import React from 'react';
import { Button, View } from 'react-native';

export default class FeaturesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Button title="All Features Articles" 
          onPress={() => this.state.navigate('Section', {sectionTitle: "All Features Articles", section: "features", navigate: this.state.navigate})}/>
        <Button title="Interviews"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Interviews Articles", section: "interviews", navigate: this.state.navigate})}/>
        <Button title="Introducing"
          onPress={() => this.state.navigate('Section', {sectionTitle: "Introducing Articles", section: "introducing", navigate: this.state.navigate})}/>
      </View>
    );
  }
}