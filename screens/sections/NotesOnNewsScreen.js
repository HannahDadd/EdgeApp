import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class NotesOnNewsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notes on News',
  };
  
  render() {
    return (
      <SectionDisplay section={"notes-on-news/"} navigate={this.props.navigation}/>
    );
  }
}