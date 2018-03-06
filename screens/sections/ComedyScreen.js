import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class ComedyScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Comedy',
  };
  
  render() {
    return (
      <SectionDisplay section={"comedy"} navigate={this.props.navigation}/>
    );
  }
}