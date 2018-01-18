import React from 'react';
import { View, Text } from 'react-native';
import FollowButton from './FollowButton';

export default class AuthorDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            bio: this.props.bio,
            profilePic: this.props.pic
        };
    }
    
    // TODO should there be a way to show what author has written

    // Article box is the articles title and featured image
    // Todo send something useful to db for following
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.bio}</Text>
                </View>
            </View>
            <FollowButton
                itemToFollow={this.state.name}
                category="author"
                buttonTitle={"Follow " + this.state.name}
            />
        </View>
        )
    }
}