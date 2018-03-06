import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class NewsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All',
  };
  
  render() {
    return (
      <SectionDisplay section={"news"} navigate={this.props.navigation}/>
    );
  }
}