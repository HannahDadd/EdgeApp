import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class RewindScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Rewind',
  };
  
  render() {
    return (
      <SectionDisplay section={"rewind"} navigate={this.props.navigation}/>
    );
  }
}