import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class FilmScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Film',
  };
  
  render() {
    return (
      <SectionDisplay section={"film"}/>
    );
  }
}