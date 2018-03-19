import React from 'react';
import { View, Text, Image, TextInput, Button, AsyncStorage } from 'react-native';
import FollowButton from './FollowButton';
import AuthorDisplay from './AuthorDisplay';
import Styles from '../Styles';

export default class AuthorSignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            bio: '',
            image: '',
            searchFor: '',
            foundUser: false,
            finishedSearching: true,
            navigate: ''
        };
    }

    // Attempt to get user from the database on component load
    componentDidMount(){
        this.getUser();
    }

    // Get user from Database if user is logged in
    async getUser(){
        // Check if they already logged in
        try {
           const value = await AsyncStorage.getItem("user");
           console.log(value);
           if (value !== null){ 
              // Set the values for the author sign in
              var obj = JSON.parse(value);
              this.setState({name: obj.name, id: obj.id, bio: obj.bio, image: obj.image,foundUser: true});
           }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

    // Find one result for author search
    searchButtonPressed(){
        this.setState({finishedSearching: false});
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/users?search=' + this.state.searchFor + '&per_page=1&_embed', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
          .then(responseJson => {
            var obj = responseJson[0];
            this.setState({name: obj.name, id: obj.id, bio: obj.bio, image: obj.image, finishedSearching: true});
          })
          .catch(error => {
            console.error(error);
          });
    }

    // Article box is the articles title and featured image
    render() {
        var signIn;
        var result = <Text></Text>;
        console.log(this.state.foundUser);
        if(!this.state.foundUser){
            if(this.state.finishedSearching && this.state.searchFor !== ''){
                result = 
                    <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'center'}}>
                            <TouchableHighlight onPress={this.props.onPressItem}>
                                <Image source={icon} style={{width: 100, height: 150}}/>
                            </TouchableHighlight>
                            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                                <Text style={Styles.sheet.titleText} onPress={this.props.onPressItem}>{this.state.name}</Text>
                                <Text style={Styles.sheet.paragraphText} onPress={this.props.onPressItem}>{this.state.bio}</Text>
                            </View>
                        </View>
                        <FollowButton
                            itemToFollow={this.state.id}
                            buttonTitle={"Follow " + this.state.name}
                        />
                    </View>
            }
            signIn = 
                <View style={{flexDirection: 'column'}}>
                    <Text style={Styles.sheet.subtitleText}>Write for The Edge? Find you!</Text>
                    <TextInput
                        style={Styles.sheet.searchText}
                        placeholder="Type your full name here"
                        onChangeText={(text) => this.setState({searchFor:text})}
                    />
                    <Button
                        color={Styles.buttonColour}
                        onPress={this.searchButtonPressed.bind(this)}
                        title="Find me!"/>
                </View>
        } else {
            signIn = 
                <View style={{flexDirection: 'column', flex:1}}>
                    <Text style={Styles.sheet.subtitleText}>You are following you:</Text>
                    <AuthorDisplay
                      name={this.state.name}
                      id={this.state.id}
                      bio={this.state.bio}
                      pic={this.state.image}
                      onPressItem={() => this.state.navigate('BrowseArticles', {name: this.state.name, id: this.state.id,
                        postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + this.state.id + '&_embed'})}
                    />
                </View>
        }
        return (
            <View style={Styles.sheet.boarderedColouredColView}>
                {signIn}
                {result}
            </View>
        )
    }
}