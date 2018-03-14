import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles';

export default class SectionListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            onPress: this.props.onPress,
            title: this.props.title
        };
    }

    render() {
        return (
            <View style={Styles.sheet.boarderedView}>
                <Text style={Styles.sheet.titleText} onPress={this.state.onPress}></Text>
            </View>
        )
    }
}