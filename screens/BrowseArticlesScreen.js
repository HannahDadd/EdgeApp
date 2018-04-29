import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import FollowButton from '../components/FollowButton';
import ArticleDisplay from '../components/ArticleDisplay';
import Styles from '../Styles';

export default class BrowseArticlesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.state.params.name,
            postsURL: this.props.navigation.state.params.postsURL,
            isSection: this.props.navigation.state.params.isSection,
            category: "",
            id: '',
            articles: [],
            offset: 0,
            moreArticlesToLoad: true,
            currentlySearching: true
        };
    }

    // Get articles from url on load
    componentDidMount() {
        if (this.state.postsURL !== undefined) {
            // If it's a section get the ID first and then set it to the post URL
            if (this.state.isSection) {
                this.setState({ category: "section" })
                this.getIDForSection();
            } else {
                this.setState({ id: this.props.navigation.state.params.id, category: this.props.navigation.state.params.category });
                this.getArticlesFromURL();
            }
        }
    }

    // Set the articles based on the postURL
    getArticlesFromURL() {
        try {
            // Don't allow users to load more while loading content to avoid errors
            this.setState({ currentlySearching: true });
            fetch(this.state.postsURL + '&offset=' + this.state.offset + '&_embed', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then(responseJson => {
                    this.setState({ articles: this.state.articles.concat(responseJson) });
                    this.setState({ offset: this.state.offset + responseJson.length });
                    this.setState({ currentlySearching: false });
                    if (responseJson.length === 0) {
                        this.setState({ moreArticlesToLoad: false });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            // Error retrieving data
        }
    }

    // Get the cateogory id from the name for sections
    getIDForSection() {
        try {
            fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/categories?slug=' + this.state.postsURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then(responseJson => {
                    if (responseJson !== undefined) {
                        if (responseJson[0] !== undefined) {
                            // set id in postURL
                            this.setState({
                                postsURL:
                                    "https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?categories=" + responseJson[0].id,
                                id: responseJson[0].id
                            });
                            this.getArticlesFromURL();
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        // If there are more articles to load display the load more button
        let loadMore = <Text style={Styles.sheet.subtitleText}>Loading...</Text>;
        if (this.state.articles.length < 1) {
            loadMore = <Text></Text>
        }
        else if (!this.state.currentlySearching) {
            if (this.state.moreArticlesToLoad) {
                loadMore = <Button style={Styles.sheet.buttonStyle}
                    onPress={this.getArticlesFromURL.bind(this)}
                    title="Load More"
                    color={Styles.buttonColour} />
            } else {
                loadMore = <Text style={Styles.sheet.subtitleText}>All Results Shown</Text>
            }
        }

        // If no search results are returned
        let results;
        if (this.state.articles.length < 1) {
            results = <Text style={Styles.sheet.subtitleText}>Loading Articles</Text>
        } else {
            // Loop through posts with that tag
            results = this.state.articles.map((article) => {
                // Check if there is a featured image to display
                let pic = '';
                // Must use typeof as any part of 'pic[0].media_details.sizes.medium.source_url' can be undefined 
                if (typeof article._embedded['wp:featuredmedia'] !== undefined) {
                    pic = article._embedded['wp:featuredmedia'];
                    if (typeof pic[0] !== undefined && typeof pic[0].media_details !== undefined
                        && typeof pic[0].media_details.sizes !== undefined
                        && typeof pic[0].media_details.sizes.medium.source_url !== undefined) {
                        pic = pic[0].media_details.sizes.medium.source_url;
                    }
                }
                // Find what author is on api and use it to be displayed on the bottom of article display
                return <View key={article.id}
                    style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <ArticleDisplay
                        title={article.title.rendered}
                        image={pic}
                        onPressItem={() => navigate('ShowArticle', { articleTitle: article.title.rendered, article: article, image: pic, author: article.author })}
                    />
                </View>
            })
        }
        // If the id has been set, show the follow button
        let follow = <Text></Text>
        if (this.state.id !== "") {
            follow = <FollowButton
                id={this.state.id}
                buttonTitle={"Follow " + this.state.name}
                category={this.state.category} />
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                {follow}
                <ScrollView>
                    {results}
                    {loadMore}
                </ScrollView>
            </View>
        );
    }
}