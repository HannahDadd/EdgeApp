import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default class SectionListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {text: this.props.name};
      }
    
    _onPress = () => {
        this.props.onPressItem(this.props.id);
        this.props.navigate(this.state.text);
    };

    render() {
        return (
            <Text style={styles.item}
                {...this.props}
                onPress={this._onPress}>
                {this.state.text}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })