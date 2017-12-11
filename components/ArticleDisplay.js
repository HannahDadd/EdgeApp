import React from 'react';
import { View, Text } from 'react-native';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { title: this.props.title};
      }
    
    // When article box clicked use stack nav to display article content
    onPress() {
        this.props.navigation.navigate('Browse', {name: this.state.title})     
    };

    // Article box is the articles title and featured image
    render() {
        return (
            <Text onPress={this.props.onPressItem}>{this.state.title}</Text>
        )
    }
}