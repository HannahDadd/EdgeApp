import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class IntroducingScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Introducing',
  };
  
  render() {
    return (
      <SectionDisplay section={"introducing"}/>
    );
  }
}