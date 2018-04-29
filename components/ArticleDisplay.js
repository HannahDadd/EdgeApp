import React from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
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
        if (String(this.state.image)) {
            try {
                if (this.state.image.includes('http')) {
                    icon = { uri: this.state.image };
                }
            } catch (error) {
                // Include won't work on empty string
                icon = require('../pictures/noimage.jpg');
            }
        } else {
            icon = require('../pictures/noimage.jpg');
        }

        // Calc. width with respect to screen size
        var width = Dimensions.get('window').width - 40;

        // Replace HTML code &#xxxx; in titles
        var title = this.state.title.replace(/&#.*;/, '');
        return (
            <View style={Styles.sheet.boarderedColouredColView}>
                <TouchableHighlight onPress={this.props.onPressItem}>
                    <Image onPress={this.props.onPressItem} source={icon} style={{width: width, height: width*2/3}}/>
                </TouchableHighlight>
                <Text style={Styles.sheet.titleText} onPress={this.props.onPressItem}>{title}</Text>
            </View>
        )
    }
}