import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Styles from '../Styles';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            title: this.props.title,
            image: this.props.image
        };
      }

    // Article box is the articles title and featured image
    render() {
        // I fhtere is a featured image, display it otherwise show no image
        var icon;
        if(String(this.state.image) && this.state.image.includes('http')){
            icon = {uri: this.state.image};
        } else {
            icon = require('../pictures/noimage.jpg');
        }

        // Replace HTML code &#xxxx; in titles
        var title = this.state.title.replace(/&#.*;/, '');
        return (
            <View style={Styles.sheet.boarderedColouredColView}>
                <TouchableHighlight onPress={this.props.onPressItem}>
                    <Image onPress={this.props.onPressItem} source={icon} style={{width: 300, height: 200}}/>
                </TouchableHighlight>
                <Text style={Styles.sheet.titleText} onPress={this.props.onPressItem}>{title}</Text>
            </View>
        )
    }
}