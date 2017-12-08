import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title};
      }
    
    _onPress = () => {
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text>{this.state.title}</Text>
            </View>
        )
    }
}