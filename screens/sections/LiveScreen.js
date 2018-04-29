import React from 'react';
import { Button, View, FlatList } from 'react-native';
import SectionListItem from '../../components/SectionListItem';

export default class LiveScreen extends React.Component {
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
          data={[{key: 'a', title: "All Live Articles", postsURL: "live"},
                {key: 'b', title: "Festivals", postsURL: "festivals"},
                {key: 'c', title: "Comedy", postsURL: "comedy"},
                {key: 'd', title: "Local Music", postsURL: "local-music"},
                {key: 'e', title: "Reviews", postsURL: "reviews"},
                {key: 'f', title: "Previews", postsURL: "previews"},
              ]}
          renderItem={({item}) => <SectionListItem title={item.title}
            onPress={() => this.state.navigate('BrowseArticles', 
            {name: item.title, postsURL:item.postsURL, isSection: true})}/>}
        />
      </View>
    );
  }
}