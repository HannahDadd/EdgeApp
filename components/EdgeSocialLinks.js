import React from 'react';
import { View, Linking, Image, TouchableHighlight } from 'react-native';
import Styles from '../Styles';

export default class EdgeSocialLinks extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    // Open a link
    _openEdgeLink(url){
        Linking.openURL(url).catch(err => console.error('Error occured', err));
    }

    // Article box is the articles title and featured image
    render() {
        return (
            <View style={Styles.sheet.boarderedColouredRowView}>
                <View>
                    <TouchableHighlight onPress={() => this._openEdgeLink("https://www.facebook.com/theedgesusu/")}>
                        <Image source={require('../pictures/fb.jpg')} style={{width: 50, height: 50}}/>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this._openEdgeLink("https://twitter.com/theedgesusu/")}>
                        <Image source={require('../pictures/twitter.jpg')} style={{width: 50, height: 50}}/>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this._openEdgeLink("https://www.instagram.com/theedgesusu/")}>
                        <Image source={require('../pictures/instagram.png')} style={{width: 50, height: 50}}/>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this._openEdgeLink("https://www.theedgesusu.co.uk/")}>
                        <Image source={require('../pictures/edge.jpg')} style={{width: 50, height: 50}}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}