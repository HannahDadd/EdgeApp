import React from 'react';
import { Text, View, Picker, Image, Button } from 'react-native';
import AuthorDisplay from '../components/AuthorDisplay';
import EdgeSocialLinks from '../components/EdgeSocialLinks';

export default class BrowseScreen extends React.Component {
    static navigationOptions = {
      title: "Read Article",
    };

    constructor(props) {
      super(props);
      this.state = {
        title: this.props.name,
        image: '',
        content: 'The content of the article',
        author: {
          name: '',
          bio: '',
          profilePic: ''
        },
        section: '',
        tags: ['tag1', 'tag2'],
        selectedTag: 'tags'
      };
    }

    // Fetch the articles content from the RSS feed
    fetchContent(){
      // TODO Fetch content from RSS feed
    }

    // todo next sprint Follow a tag
    followTag(){}

    render() {
      const { navigate } = this.props.navigation;
      let image;
      // Check if there is a featured image to display
      if(this.state.image === ''){
        image = <Text>No Featured Image</Text>
      } else {
        image =  
          <Image
              source={this.state.image}
          />
      }

      // TODO Facebook like and share
      let facebookLikeShare = <Text>Facebook like and share</Text>

      // Add tags to the picker
      let tags = this.state.tags.map((tag, i) => {
        return <Picker.Item label={tag} value={tag} key={i}/>
      })
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          {image}
          <Text>{this.state.title}</Text>
          <Text>{this.state.content}</Text>
          {facebookLikeShare}
          <Text>{this.state.section}</Text>
          <AuthorDisplay
            name={this.state.name}
            bio={this.state.author.bio}
            profilePic={this.state.author.profilePic}
          />
          <Text>Article Tags:</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Picker
              selectedValue={this.state.selectedTag}
              onValueChange={(itemValue) => this.setState({selectedTag: itemValue})}>
              {tags}
            </Picker>
            <Button
              onPress={this.followTag.bind(this)}
              title='Follow Tag'
            />
          </View>
          <EdgeSocialLinks/>
        </View>
      );
    }
  }