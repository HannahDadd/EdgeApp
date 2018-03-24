import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import Styles from '../Styles';
import Follow from './Follow';

export default class FollowButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            buttonTitle: this.props.buttonTitle,
            isUser: this.props.isUser,
            userData: this.props.userData,
            category: "following",
            followingItem: false
        };
    }

    // When the component mounts check if they are following this item
    componentDidMount(){
        if(this.props.isAuthor){
            this.setState({category: "author"});
        }
        this.areFollowing();
    }

    // Check if user following item already
    async areFollowing(){
        try{
            const value = await AsyncStorage.getItem(this.state.category);
            const following = JSON.parse(value);
            if(following.indexOf(this.state.id) > -1){
                this.setState({followingItem: true});
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    // Add the item to the database
    async follow(){
        // Check if they are already following anything
        try {
            // If they are the user set this as them
            if(this.state.isUser){
                AsyncStorage.setItem("user", JSON.stringify(this.state.userData), () => {
                    // User set in db
                });
            }
           const value = await AsyncStorage.getItem(this.state.category);
           const following = JSON.parse(value);
           if (following !== null){
            following.push(this.state.id);
           } else {
               following = [this.state.id];
           }
           // Update what they are following
           AsyncStorage.setItem(this.state.category, JSON.stringify(following), () => {
                // The item should now be added to the db
                this.setState({followingItem: true});
                this.registerForNotifications(); 
            });

            // If its not an author, store the title as well
            if(this.state.category !== "author"){
                const value = await AsyncStorage.getItem("titles");
                const following = JSON.parse(value);
                if (following[0] !== null){
                 following.push(this.state.buttonTitle.replace('Follow ',''));
                } else {
                    following = [this.state.buttonTitle.replace('Follow ','')];
                }
                
                // Update what they are following
                AsyncStorage.setItem("titles", JSON.stringify(following), () => {
                     // Updated the names of what they're following too
                 });
            }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    }

    // Follow on API
    registerForNotifications(){
        Follow.show(this.state.id);
        fetch('http://theedgesusu.co.uk/pnfw/categories/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: FCMToken,
            os: 'Android',
            id: this.state.id,
            exclude: false,
        }),
        });
    }

    // Button to follow an item
    render() {
        let followInfo;
        if(this.state.followingItem){
            followInfo = <Text style={Styles.sheet.titleText}>Following!</Text>
        } else {
            followInfo = <Button color={Styles.buttonColour} title={this.state.buttonTitle} 
            onPress={this.follow.bind(this)}/>
        }
        return (
            <View>
                {followInfo}
            </View>
        )
    }
}