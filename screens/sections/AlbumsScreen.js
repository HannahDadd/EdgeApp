import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class AlbumsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Albums',
  };
  
  render() {
    return (
      <SectionDisplay section={"albums"}/>
    );
  }
}