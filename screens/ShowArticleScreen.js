import React from 'react';
import { Text, View, Picker, Image, Button, ScrollView, AsyncStorage, Switch, WebView } from 'react-native';
import { LoginButton, ShareDialog } from 'react-native-fbsdk';
import Styles from '../Styles';

export default class ShowArticleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            content: this.props.navigation.state.params.article.content.rendered,
            author: this.props.navigation.state.params.article.author,
            authorName: '',
            authorBio: '',
            authorPic: '',
            tagIDs: this.props.navigation.state.params.article.tags,
            link: this.props.navigation.state.params.article.link,
            nightmode: false
        };
    }

    // Share this article to FB
    shareLinkWithShareDialog() {
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: this.state.link,
            contentDescription: 'Check out this article!'
        };

        var tmp = this;
        ShareDialog.canShow(shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(shareLinkContent);
                }
            }
        ).then(
            function (result) {
                console.log(result);
                if (result.isCancelled) {
                    alert('Share operation was cancelled');
                } else {
                    // Share operations was a sucess
                }
            },
            function (error) {
                alert('Share failed with error: ' + error.message);
            }
            );
    }

    // Fetch data from the api
    getJSONData(searchIn, searchFor, callBack) {
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/' + searchIn + '?search=' + searchFor + '&_embed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                callBack(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Query rest api for data- use fetch api
    componentDidMount() {
        // Set article as read
        //this.addArticleIDtoReadArticles(this.state.id);
        // Get author
        this.getJSONData('users', this.state.author,
            function (responseJson) {
                if (responseJson && responseJson[0] !== undefined) {
                    this.setState(
                        {
                            authorName: responseJson[0].name,
                            authorBio: responseJson[0].description,
                            authorPic: responseJson[0]['avatar_urls'][96]
                        });
                }
            }.bind(this)
        );
        // Get tags from id
        // for (var i = 0; i <  this.state.tagIDs.length; i++) {
        //    this.addTagIdToRecommender(this.state.tagIDs[i]);
        // }
    }

    // Add read articles to datastore so they are not recommended articles they have already read
    async addArticleIDtoReadArticles(articleID) {
        // Check if they are already following this tag, author or section
        try {
            const value = await AsyncStorage.getItem("viewedArticles");
            const readArticles = JSON.parse(value);
            if (readArticles !== null) {
                readArticles.push(articleID);
            } else {
                readArticles = [articleID];
            }
            // Update what they are following
            AsyncStorage.setItem("viewedArticles", JSON.stringify(readArticles), () => {
                // The item should now be added to the db
            });
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    async addTagIdToRecommender(tagID) {
        try {
            // If they are following the tag, don't recommend it
            const tagsFollowing = await AsyncStorage.getItem("tags");
            if (tagsFollowing === null || tagsFollowing.indexOf(tagID) < 0) {
                const value = await AsyncStorage.getItem("viewedTags");
                const viewedTags = JSON.parse(value);
                viewedTags.push(tagID);
                // Update what they are following
                AsyncStorage.setItem("viewedTags", JSON.stringify(viewedTags), () => {
                    // The item should now be added to the db
                });
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        // Remove html tags from content .replace(/<(?:.|\n)*?>/gm, '')
        var content = this.state.content;
        let backgroundColor = 'white';
        if (this.state.nightmode) {
            backgroundColor = '#FFE299';
        }
        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={Styles.sheet.subtitleText}>Night Mode:</Text>
                    <View>
                        <Switch value={this.state.nightmode} onValueChange={(value) => this.setState({ nightmode: value })} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Button color={Styles.buttonColour} title="See Author"
                            onPress={() => navigate('BrowseArticles', {
                                name: this.state.authorName, id: this.state.author, category: "author",
                                postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + this.state.author + '&_embed'
                            })} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Button color={Styles.buttonColour} title="See Tags" onPress={() => navigate('Tags', { tagIDs: this.state.tagIDs })} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <Button color={Styles.buttonColour} title="Share to Facebook"
                            onPress={this.shareLinkWithShareDialog.bind(this)} />
                    </View>
                </View>
                <WebView id={"webview"} source={{ html: content }} style={{ backgroundColor: backgroundColor, marginTop: 20 }} />
            </View>
        );
    }
}