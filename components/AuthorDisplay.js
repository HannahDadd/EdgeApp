import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default class AuthorDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            bio: this.props.bio,
            profilePic: this.props.profilePic
        };
    }
    
    // TODO should there be a way to show what author has written??

    // Follow an author
    followAuthor(){
        // For another sprint
    }

    // Article box is the articles title and featured image
    render() {
        // Check if there is a profile image to display
        let image;
        if(this.state.profilePic !== ''){
            image =  
            <Image
                source={this.state.profilePic}
            />
        }
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {image}
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.bio}</Text>
                    </View>
                </View>
                <Button
                    onPress={this.followAuthor.bind(this)}
                    title={'Follow '+ this.state.name}
                />
            </View>
        )
    }
}