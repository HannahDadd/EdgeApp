import React from 'react';
import { View, Text } from 'react-native';

export default class ArticleDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            profilePic: this.props.profilePic
        };
      }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Image
                    source={this.state.profilePic}/>
                <Text>{this.state.name}</Text>
            </View>
        )
    }
}