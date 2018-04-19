import React from 'react';
import { View, Text, Image, Switch, AsyncStorage, ScrollView } from 'react-native';
import Styles from '../Styles';
import ArticleDisplay from '../components/ArticleDisplay';
import Follow from '../Follow';
import EdgeSocialLinks from '../components/EdgeSocialLinks';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pushNotification: false,
            articlesToDisplay: [],
            recommendedArticles: [],
            offset: 0
        };
    }

    // Get reccomeneded article for user
    async getRecommendedArticle() {
        try {
            var tags = await AsyncStorage.getItem("viewedTags");
            let viewedTags = JSON.parse(tags);
            const articlesRead = await AsyncStorage.getItem("viewedArticles");
            let readArticles = JSON.parse(articlesRead);
            console.log(viewedTags);
            // Display tn articles on the home screen, recommended ones and latest content
            for (i = 0; i <= viewedTags.length; i++) {
                // If they have not read any articles i.e. have no tags, suggest last article published      
                if (viewedTags !== null) {
                    // Go through all tags and recommend if article is returned
                    this.getTaggedArticles(viewedTags[i], articlesRead);
                }
            }
            // Return last articles published
            this.getArticlesPublishedRecently();
        } catch (error) {
            // Error retrieving data
        }
    }

    // Get the tags JSON values
    getTaggedArticles(tagID, articlesRead) {
        // Search posts with that content in. Only return a maximum of 3 articles per tag
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?search=' + tagID + '&per_page=3&_embed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                // Loop through returned articles and add them to recommender
                this.setState({
                    recommendedArticles: this.state.recommendedArticles.concat(responseJson)
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Get last article published
    getArticlesPublishedRecently() {
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?offset=' + this.state.offset + '&_embed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                // Set offset
                this.setState({ offset: this.state.offset++ });
                this.setState({
                    articlesToDisplay: this.state.articlesToDisplay.concat(responseJson)
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        Follow.getToken((msg) => {
            console.log(msg);
        },
            (token) => {
                console.log("token", token);
                try {
                    // Send token to firebase server
                    fetch('https://www.theedgesusu.co.uk/pnfw/register/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Length': 26,
                        },
                        body: JSON.stringify({
                            token: token,
                            os: 'Android',
                        }),
                    }).catch(error => {
                        console.error(error);
                    });
                    // Subscribe to breaking news
                    fetch('http://theedgesusu.co.uk/pnfw/categories/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Length': 26,
                        },
                        body: JSON.stringify({
                            token: token,
                            os: 'Android',
                            id: 4039,
                            exclude: false,
                        }),
                    })
                } catch (err) {
                    console.log(err);
                }
            }
        );
        //Follow.sendRegistrationToServer();
        //Follow.breakingNewsReg();
        this.getRecommendedArticle();
    }

    render() {
        const { navigate } = this.props.navigation;

        // Display the articles
        let articles;
        if (this.state.articlesToDisplay.length < 1) {
            articles = <Text style={Styles.sheet.subtitleText}>Loading...</Text>
        }
        else {
            articles = this.state.articlesToDisplay.map((article) => {
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
        } 
        // Display recommended articles
        let articleRecs;
        if (this.state.recommendedArticles.length < 1) {
            articleRecs = <Text style={Styles.sheet.subtitleText}></Text>
        }
        else {
            articleRecs = this.state.recommendedArticles.map((article) => {
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
                    <Text style={Styles.sheet.subtitleText}>Recommended for you</Text>
                    <ArticleDisplay
                        title={article.title.rendered}
                        image={pic}
                        onPressItem={() => navigate('ShowArticle', { article: article, image: pic })}
                    />
                </View>
            })
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                <EdgeSocialLinks />
                <ScrollView>
                    {articleRecs}
                    {articles}
                </ScrollView>
            </View>
        );
    }
}