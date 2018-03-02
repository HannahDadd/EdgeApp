import React from 'react';
import SectionDisplay from '.../components/SectionDisplay';

export default class VideoGamesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Video Games',
  };
  
  render() {
    return (
      <SectionDisplay section={"video-games"}/>
    );
  }
}