import React from 'react';
import SectionDisplay from '../../components/SectionDisplay';

export default class AlbumsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    tabBarLabel: 'Albums',
  };
  
  render() {
    return (
      <SectionDisplay section={"albums"} navigate={this.props.navigation}/>
    );
  }
}