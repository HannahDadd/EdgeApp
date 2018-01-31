import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from '../Styles';

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
        if(String(this.state.image) && this.state.image.includes('http')){
            icon = {uri: this.state.image};
        } else {
            icon = require('../pictures/noimage.jpg');
        }
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <Image onPress={this.props.onPressItem} source={icon} style={{width: 300, height: 200}}/>
                <Text style={Styles.sheet.titleText} onPress={this.props.onPressItem}>{this.state.title}</Text>
            </View>
        )
    }
}