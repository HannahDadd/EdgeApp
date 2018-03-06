import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class CultureScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All',
  };
  
  render() {
    return (
      <SectionDisplay section={"culture"} navigate={this.props.navigation}/>
    );
  }
}