import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class ReviewsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Review',
  };
  
  render() {
    return (
      <SectionDisplay section={"reviews"}/>
    );
  }
}