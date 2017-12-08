import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { title: this.props.title};
      }
    
    onPress() {
        // this.props.onPressItem(this.props.id);
        // this.props.navigation.navigate(this.state.title);
        this.props.navigation.navigate('Browse', {name: this.state.title})     
    };

    render() {
        return (
            <Text onPress={this.props.onPressItem}>{this.state.title}</Text>
        )
    }
}