import React from 'react';
import { Text, View, Picker, Image, Button, ScrollView, WebView } from 'react-native';
import AuthorDisplay from '../components/AuthorDisplay';
import EdgeSocialLinks from '../components/EdgeSocialLinks';

export default class BrowseScreen extends React.Component {
    static navigationOptions = {
      title: "Read Article",
    };

    constructor(props) {
      super(props);
      this.state = {
        id: this.props.navigation.state.params.id,
        title: this.props.navigation.state.params.article.title.rendered,
        image: this.props.navigation.state.params.image,
        content: this.props.navigation.state.params.article.content.rendered,
        author: {
          name: this.props.navigation.state.params.article._embedded.author.name,
          bio: this.props.navigation.state.params.article._embedded.author.description,
          profilePic: ''
        },
        section: '',
        tags: ['tag1', 'tag2'],
        selectedTag: 'tags'
      };
    }

    // Fetch the content of the article
    fetchArticleText(){
      console.log(this.props.navigation.state.params.article);
      this.setState({
        title: this.props.navigation.state.params.article.title.rendered,
        //image: this.props.navigation.state.params.article._embedded['wp:featuredmedia'].media_details.sizes.medium.source_url,
        content: this.props.navigation.state.params.article.content.rendered,
        author: {
          name: this.props.navigation.state.params.article._embedded.author.name,
          bio: this.props.navigation.state.params.article._embedded.author.description,
          profilePic: ''
        }
      });

      // Tags will be sent as an id so collect the tags names from the id
      // let tagsArray = this.props.navigation.state.param.article.tags;
      // let tags = []
      // for (var i = 0; i < tagsArray.length; i++) {
      //   tags.push(this.fetchContent('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags?include=' + tagsArray[i]).name);        
      // }
      // this.setState({tags: tags})
    }

    // todo next sprint Follow a tag
    followTag(){}

    render() {
      const { navigate } = this.props.navigation;
      // Check if there is a featured image to display
      var icon;
      if(this.state.image === ''){
          icon = require('../pictures/noimage.jpg');
      } else {
          icon = {uri: this.state.image};
      }
      // TODO Facebook like and share
      let facebookLikeShare = <Text>Facebook like and share</Text>
      // Add tags to the picker
      let tags = this.state.tags.map((tag, i) => {
        return <Picker.Item label={tag} value={tag} key={i}/>
      })
      return (
        <ScrollView style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <Image source={icon} style={{width: 350, height: 200}}/>
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
        </ScrollView>
      );
    }
  }