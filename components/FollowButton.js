import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import Styles from '../Styles';
import {FCMToken} from '../App.js';

export default class FollowButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            buttonTitle: this.props.buttonTitle,
            followingItem: false
        };
    }

    // Add the item to the database
    async follow(){
        // Check if they are already following anything
        try {
           const value = await AsyncStorage.getItem("following");
           if (value !== null){ 
              // Add new tag author or section to db
              AsyncStorage.mergeItem("following", JSON.stringify(this.state.id), () => {
                  // The item should now be added to the db, register it with push notifications
                  this.setState({followingItem: true});
                  this.registerForNotifications();

            });
           }
           else {
              // Update what they are following
              AsyncStorage.setItem("following", this.state.id, () => {
                  // The item should now be added to the db
                  this.setState({followingItem: true});
                  this.registerForNotifications();
              });
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

    // Follow on API
    registerForNotifications(){
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
            followInfo = <Text>Following!</Text>
        } else {
            followInfo = <Button title={this.state.buttonTitle} onPress={this.follow.bind(this)}/>
        }
        return (
            <View>
                {followInfo}
            </View>
        )
    }
}