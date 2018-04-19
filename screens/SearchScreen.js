import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Picker, ScrollView, TouchableHighlight, Image } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import Styles from '../Styles';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFor: '',
            results: [],
            searchIn: 'posts',
            offset: 0,
            moreArticlesToLoad: true,
            currentlySearching: false
        };
    }

    // Query rest api for data- use fetch api
    getJSONData() {
        // Don't allow users to load more while loading content to avoid errors
        this.setState({ currentlySearching: true });
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/' + this.state.searchIn + '?offset=' + this.state.offset + '&search=' + this.state.searchFor + '&_embed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                this.setState({ results: this.state.results.concat(responseJson) });
                this.setState({ offset: this.state.offset + responseJson.length });
                this.setState({ currentlySearching: false });
                if (responseJson.length === 0) {
                    this.setState({ moreArticlesToLoad: false });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    // When search button is pressed, remove offset and set the boolean for more articles to load
    searchButtonPressed() {
        this.setState({ offset: 0, results: [] });
        this.getJSONData();
    }

    render() {
        const { navigate } = this.props.navigation;

        // If there are more articles to load display the load more button
        let loadMore = <Text style={Styles.sheet.subtitleText}>Loading...</Text>;
        if (this.state.results.length < 1) {
            loadMore = <Text></Text>
        }
        else if (!this.state.currentlySearching) {
            if (this.state.moreArticlesToLoad) {
                loadMore = <Button color={Styles.buttonColour}
                    onPress={this.getJSONData.bind(this)}
                    title="Load More" />
            } else {
                loadMore = <Text style={Styles.sheet.subtitleText}>All Search Results Shown</Text>
            }
        }

        // If no search results are returned
        let results = <Text></Text>;
        if (this.state.results.length < 1) {
            // If it is currently searching API say "searching"
            if (this.state.searchIn !== '') {
                if (this.state.currentlySearching) {
                    results = <Text style={Styles.sheet.subtitleText}>Searching...</Text>
                }
            } else {
                results = <Text style={Styles.sheet.subtitleText}>No Results for your search</Text>
            }
        }
        // Display article names and images
        else if (this.state.searchIn === 'posts') {
            results = this.state.results.map((article) => {
                // Check if there is a featured image to display
                let pic = '';
                // Must use typeof as any part of 'pic[0].media_details.sizes.medium.source_url' can be undefined 
                if (article && article._embedded && article._embedded['wp:featuredmedia'] !== undefined) {
                    pic = article._embedded['wp:featuredmedia'];
                    if (pic[0].media_details && pic[0].media_details.sizes && pic[0].media_details.sizes.medium
                        && pic[0].media_details.sizes.medium.source_url !== undefined) {
                        pic = pic[0].media_details.sizes.medium.source_url;
                    }
                }
                return <View key={article.id}
                    style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <ArticleDisplay
                        title={article.title.rendered}
                        image={pic}
                        onPressItem={() => navigate('ShowArticle', { article: article, image: pic })}
                    />
                </View>
            })
            // If search results are users display users with picture, name and bio
        } else if (this.state.searchIn === 'users') {
            results = this.state.results.map((author) => {
                return <View key={author.id} style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <AuthorDisplay
                        name={author.name}
                        id={author.id}
                        bio={author.description}
                        pic={author['avatar_urls'][96]}
                        onPressItem={() => navigate('BrowseArticles', {
                            name: author.name, id: author.id,
                            postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + author.id + '&_embed'
                        })}
                    />
                </View>
            })
            // Display any potential tags
        } else if (this.state.searchIn === 'tags') {
            results = this.state.results.map((tag) => {
                return <View key={tag.id} style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <Text style={Styles.sheet.tagNavText} onPress={() => navigate('BrowseArticles',
                        { name: tag.name, id: tag.id, postsURL: tag["_links"]["wp:post_type"][0].href })}>{tag.name}
                    </Text>
                </View>
            })
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={Styles.sheet.searchBoxArea}>
                    <TextInput
                        style={Styles.sheet.searchText}
                        placeholder="Type here to search!"
                        onChangeText={(text) => this.setState({ searchFor: text })}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Picker
                                selectedValue={this.state.searchIn}
                                onValueChange={(itemValue) => this.setState({ searchIn: itemValue, results: [] })}>
                                <Picker.Item label="Post" value="posts" />
                                <Picker.Item label="Author" value="users" />
                                <Picker.Item label="Tag" value="tags" />
                            </Picker>
                        </View>
                        <View>
                            <Button style={Styles.sheet.buttonStyle}
                                color={Styles.buttonColour}
                                onPress={this.searchButtonPressed.bind(this)}
                                title="Search" />
                        </View>
                    </View>
                </View>
                <ScrollView style={{ padding: 10 }}                                    >
                    {results}
                    {loadMore}
                </ScrollView>
            </View>
        );
    }
}