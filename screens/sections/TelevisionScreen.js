import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class TelevisionScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Television',
  };
  
  render() {
    return (
      <SectionDisplay section={"television"}/>
    );
  }
}