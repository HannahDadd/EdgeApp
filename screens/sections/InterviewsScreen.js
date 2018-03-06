import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class InterviewScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Interviews',
  };
  
  render() {
    return (
      <SectionDisplay section={"interviews"} navigate={this.props.navigation}/>
    );
  }
}