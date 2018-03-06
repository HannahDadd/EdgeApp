import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class ArchiveCommentScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Archive & Comment',
  };
  
  render() {
    return (
      <SectionDisplay section={"archive-comment"} navigate={this.props.navigation}/>
    );
  }
}