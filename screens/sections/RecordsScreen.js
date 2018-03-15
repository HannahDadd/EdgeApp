import React from 'react';
import { Button, View, FlatList } from 'react-native';
import SectionListItem from '../../components/SectionListItem';

export default class RecordsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        navigate: this.props.navigation.navigate
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <FlatList
          data={[{key: 'a', title: "All Records Articles", postsURL: "records"},
                {key: 'b', title: "Singles", postsURL: "singles"},
                {key: 'c', title: "Albums", postsURL: "albums"},
                {key: 'd', title: "Rewind", postsURL: "rewind"},
              ]}
          renderItem={({item}) => <SectionListItem title={item.title}
            onPress={() => this.state.navigate('BrowseArticles', 
            {name: item.title, postsURL:item.postsURL, isSection: true})}/>}
        />
      </View>
    );
  }
}