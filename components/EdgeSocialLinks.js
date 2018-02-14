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
                <TouchableHighlight onPress={this.openEdgeLink("https://www.facebook.com/theedgesusu/").bind(this)}>
                    <Image source={require('../pictures/fb.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("https://twitter.com/theedgesusu/").bind(this)}>
                    <Image source={require('../pictures/twitter.jpg')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("https://www.instagram.com/theedgesusu/").bind(this)}>
                    <Image source={require('../pictures/instagram.png')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.openEdgeLink("https://www.theedgesusu.co.uk/").bind(this)}>
                    <Image source={require('../pictures/edge.png')} style={{width: 50, height: 50}}/>
                </TouchableHighlight>
            </View>
        )
    }
}