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
            <View style={{padding:2}}>
                <View style={Styles.sheet.boarderedColouredColView}>
                    <Text style={Styles.sheet.sectionTitleText} onPress={this.state.onPress}>{this.state.title}</Text>
                </View>
            </View>
        )
    }
}