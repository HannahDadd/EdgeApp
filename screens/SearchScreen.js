import React from 'react';
import { Text, TextInput, View, FlatList, StyleSheet } from 'react-native';
import SectionList from '../components/SectionList';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'Search',
    };

    constructor(props) {
        super(props);
        this.state = {text: ''};
      }

    render() {
      const { navigate } = this.props.navigation;
      return (
    <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{padding: 10}}>
        <TextInput
            style={{height: 40}}
            placeholder="Type here to search!"
            onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text}
        </Text>
        </View>
        <View style={styles.container}>
            <SectionList/>
        </View>
    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })