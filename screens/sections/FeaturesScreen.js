import React from 'react';
import { Button, View, FlatList } from 'react-native';
import SectionListItem from '../../components/SectionListItem';

export default class FeaturesScreen extends React.Component {
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
          data={[{key: 'a', title: "All Features Articles", postsURL: "features"},
                {key: 'b', title: "Interviews", postsURL: "interviews"},
                {key: 'c', title: "Introducing", postsURL: "introducing"},
              ]}
          renderItem={({item}) => <SectionListItem title={item.title}
            onPress={() => this.state.navigate('BrowseArticles', 
            {name: item.title, postsURL:item.postsURL, isSection: true})}/>}
        />
      </View>
    );
  }
}