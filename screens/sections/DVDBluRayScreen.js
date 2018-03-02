import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class DVDBluRayScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'DVD & Blu Ray',
  };
  
  render() {
    return (
      <SectionDisplay section={"dvd-bluray"}/>
    );
  }
}