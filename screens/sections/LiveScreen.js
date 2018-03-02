import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class LiveScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All',
  };
  
  render() {
    return (
      <SectionDisplay section={"live"}/>
    );
  }
}