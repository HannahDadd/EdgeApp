import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import ArticleDisplay from './ArticleDisplay';
import Styles from '../Styles';

export default class RecommendedArticle extends React.PureComponent {
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
                <Text>Reccomended for you</Text>
                <ArticleDisplay title={this.state.title} image={this.state.image}/>
            </View>
        )
    }
}