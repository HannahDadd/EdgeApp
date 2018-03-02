import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class RecordsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All',
  };
  
  render() {
    return (
      <SectionDisplay section={"records"}/>
    );
  }
}