import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class PreviewsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Preview',
  };
  
  render() {
    return (
      <SectionDisplay section={"previews"}/>
    );
  }
}