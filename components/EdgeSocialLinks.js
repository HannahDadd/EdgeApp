import React from 'react';
import { View, Linking, Image, TouchableHighlight } from 'react-native';

export default class EdgeSocialLinks extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    // Open a link
    openEdgeLink(url){
        Linking.openURL(url).catch(err => console.error('Error occured', err));
    }

    // Article box is the articles title and featured image
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <TouchableHighlight onPress={this.openEdgeLink("").bind(this)}>
                    <Image source={require('../pictures/facebook.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("").bind(this)}>
                    <Image source={require('../pictures/twitter.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("").bind(this)}>
                    <Image source={require('../pictures/instagram.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("").bind(this)}>
                    <Image source={require('../pictures/website.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
            </View>
        )
    }
}