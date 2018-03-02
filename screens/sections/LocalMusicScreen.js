import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class LocalMusicScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Local Music',
  };
  
  render() {
    return (
      <SectionDisplay section={"local-music"}/>
    );
  }
}