import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class LiteratureScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Literature',
  };
  
  render() {
    return (
      <SectionDisplay section={"literature"}/>
    );
  }
}