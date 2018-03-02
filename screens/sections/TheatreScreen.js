import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class TheatreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Theatre',
  };
  
  render() {
    return (
      <SectionDisplay section={"theatre"}/>
    );
  }
}