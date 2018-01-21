import React from 'react';
import { View, Text, Image } from 'react-native';
import FollowButton from './FollowButton';

export default class AuthorDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            id: this.props.id,
            bio: this.props.bio,
            image: this.props.pic
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
            <View style={{flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'center'}}>
            <Image onPress={this.props.onPressItem} source={icon} style={{width: 100, height: 150}}/>
                <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                    <Text onPress={this.props.onPressItem}>{this.state.name}</Text>
                    <Text onPress={this.props.onPressItem}>{this.state.bio}</Text>
                </View>
            </View>
            <FollowButton
                itemToFollow={this.state.id}
                category="author"
                buttonTitle={"Follow " + this.state.name}
            />
        </View>
        )
    }
}