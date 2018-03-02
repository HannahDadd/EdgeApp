import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class SinglesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Singles',
  };
  
  render() {
    return (
      <SectionDisplay section={"singles"}/>
    );
  }
}