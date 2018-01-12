import React from 'react';
import { View, Text, Image } from 'react-native';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            title: this.props.title,
            image: this.props.image,
            excerpt: ''
        };
      }

    // Article box is the articles title and featured image
    render() {
        var icon;
        if(this.state.image === ''){
            icon = require('../pictures/noimage.jpg');
        } else {
            icon = {uri: this.state.image};
        }
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <Image onPress={this.props.onPressItem} source={icon} style={{width: 300, height: 200}}/>
                <Text style={{fontSize: 20}} onPress={this.props.onPressItem}>{this.state.title}</Text>
            </View>
        )
    }
}