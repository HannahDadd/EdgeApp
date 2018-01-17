import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import Styles from '../Styles';

export default class FollowButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.itemToFollow,
            category: this.props.category,
            buttonTitle: this.props.buttonTitle,
            followingItem: false
        };
    }

    // Add the item to the database
    async follow(){
        // Check if they are already following this tag, author or section
        try {
           const value = await AsyncStorage.getItem(this.state.category);
           if (value != null){ 
              // Add new tag author or section to db
              AsyncStorage.mergeItem(this.state.category, JSON.stringify(this.state.item), () => {
                  // The item should now be added to the db
                  this.setState({followingItem: true});
            });
           }
           else {
              // Update what they are following
              AsyncStorage.setItem(this.state.category, JSON.stringify(this.state.item), () => {
                  // The item should now be added to the db
                  this.setState({followingItem: true});
              });
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
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