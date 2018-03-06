import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class FestivalsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Festivals',
  };
  
  render() {
    return (
      <SectionDisplay section={"festivals"} navigate={this.props.navigation}/>
    );
  }
}