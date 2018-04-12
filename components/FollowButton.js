import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import Styles from '../Styles';
import Follow from '../Follow';

export default class FollowButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            buttonTitle: this.props.buttonTitle,
            isUser: this.props.isUser,
            userData: this.props.userData,
            category: this.props.category,
            followingItem: false
        };
    }

    // When the component mounts check if they are following this item
    componentDidMount() {
        this.areFollowing();
    }

    // Check if user following item already
    async areFollowing() {
        try {
            // Search all ids being followed in category
            const value = await AsyncStorage.getItem(this.state.category);
            const following = JSON.parse(value);
            // If they already have this category, see if they are following this id
            if (following !== null) {
                // If the id trying to follow is there, set following to true
                if (following.indexOf(this.state.id) > -1) {
                    this.setState({ followingItem: true });
                }
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    // Add the item to the database
    async follow() {
        // Check if they are already following something in that category   
        try {
            // If they are the user set this as them
            if (this.state.isUser) {
                AsyncStorage.setItem("user", JSON.stringify(this.state.userData), () => {
                    // User set in db
                });
            }
            // Get all items they are following in the DB
            const value = await AsyncStorage.getItem(this.state.category);
            const following = JSON.parse(value);
            // If they are not following items from that category in the DB create it in the DB
            if (following !== null) {
                following.push(this.state.id);
            } else {
                following = [this.state.id];
            }
            // Update what they are following
            AsyncStorage.setItem(this.state.category, JSON.stringify(following), () => {
                // The item should now be added to the db, register on server for Notifications
                this.setState({ followingItem: true });
                this.registerForNotifications();
            });
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    // Follow on API
    registerForNotifications() {
        const param = this.state.id + ""
        Follow.follow(param);
    }

    // Button to follow an item
    render() {
        let followInfo;
        // Show following if already following item, follow button otherwise
        if (this.state.followingItem) {
            followInfo = <Text style={Styles.sheet.titleText}>Following!</Text>
        } else {
            followInfo = <Button color={Styles.buttonColour} title={this.state.buttonTitle}
                onPress={this.follow.bind(this)} />
        }
        return (
            <View>
                {followInfo}
            </View>
        )
    }
}