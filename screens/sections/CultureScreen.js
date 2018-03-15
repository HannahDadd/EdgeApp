import React from 'react';
import { Button, View, FlatList } from 'react-native';
import SectionListItem from '../../components/SectionListItem';

export default class CultureScreen extends React.Component {
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
          data={[{key: 'a', title: "All Culture Articles", postsURL: "culture"},
                {key: 'b', title: "Theatre", postsURL: "theatre"},
                {key: 'c', title: "Television", postsURL: "television"},
                {key: 'd', title: "Video Games", postsURL: "video-games"},
                {key: 'e', title: "Literature", postsURL: "literature"},
              ]}
          renderItem={({item}) => <SectionListItem title={item.title}
            onPress={() => this.state.navigate('BrowseArticles', 
            {name: item.title, postsURL:item.postsURL, isSection: true})}/>}
        />
      </View>
    );
  }
}