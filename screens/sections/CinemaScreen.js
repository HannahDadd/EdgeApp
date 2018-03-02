import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class CinemaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Cinema',
  };
  
  render() {
    return (
      <SectionDisplay section={"cinema"}/>
    );
  }
}