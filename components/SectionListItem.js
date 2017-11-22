import React from 'react';
import { Text } from 'react-native';

export default class SectionListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {text: 'Hi'};
      }
    
    _onPress = () => {
        this.props.onPressItem(this.props.id);
        this.setState({text: 'Hello'})
    };

    render() {
        return (
            <Text 
                {...this.props}
                onPress={this._onPress}>
                {this.state.text}
            </Text>
        )
    }
}