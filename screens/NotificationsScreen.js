import React from 'react';
import { View, Text, Switch, AsyncStorage, FlatList, Button } from 'react-native';
import ArticleDisplay from '../components/ArticleDisplay';
import AuthorDisplay from '../components/AuthorDisplay';
import FacebookLogin from '../components/FacebookLogin';
import SectionListItem from '../components/SectionListItem';

export default class NotificationsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications',
        pushNotification: true
    };

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            sections: [],
            tags: [],
            navigate: this.props.navigation.navigate,
            currentlyLoading: false
        }
    }

    componentDidMount() {
        this.loadContent();
    }

    // See if new items added to db
    loadContent() {
        this.setState({ currentlyLoading: true });
        // Reset the ids in case they have changed
        this.getIDsFromDB("author", 'https://www.theedgesusu.co.uk/wp-json/wp/v2/users/');
        this.getIDsFromDB("tag", 'https://www.theedgesusu.co.uk/wp-json/wp/v2/tags/');
        this.getIDsFromDB("section", 'https://www.theedgesusu.co.uk/wp-json/wp/v2/categories/');
        this.setState({ currentlyLoading: false });
    }

    // Get ids from db and put in array
    async getIDsFromDB(category, url) {
        try {
            // Remove any pre-stored data
            if (category === "author") {
                this.setState({ authors: [] });
            } else if (category === "tag") {
                this.setState({ tags: [] });
            } else if (category === "section") {
                this.setState({ sections: [] });
            }
            AsyncStorage.getItem(category, (err, idList) => {
                var result = JSON.parse(idList);
                // If item in db return list of ids otherwise return 
                if (result !== null) {
                    result.map((id) => {
                        this.getItemFromID(url + id, category);
                    })
                }
            });
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    // Method to get item from author its id
    getItemFromID(url, category) {
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                // Add object to array
                if (category === "author") {
                    var newArray = this.state.authors;
                    newArray.push(responseJson);
                    this.setState({ authors: newArray });
                } else if (category === "tag") {
                    var newArray = this.state.tags;
                    newArray.push(responseJson);
                    this.setState({ tags: newArray });
                } else if (category === "section") {
                    var newArray = this.state.sections;
                    newArray.push(responseJson);
                    this.setState({ sections: newArray });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        let loadMore = <Text>Loading Content</Text>
        if (!this.state.currentlyLoading) {
            loadMore = <Button color={Styles.buttonColour}
                onPress={this.loadContent.bind(this)}
                title="Refresh" />
        }
        // Get the authors and display them
        let authors = [];
        authors = this.state.authors.map((author) => {
            return { key: author.id, title: author.name, postsURL: 'https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?author=' + author.id + '&_embed' }
        });
        // Get the tags and display them
        let tags = [];
        tags = this.state.tags.map((tag) => {
            return { key: tag.id, title: tag.name, postsURL: "https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?tags=" + tag.id }
        });
        // Get the authors and display them
        let sections = [];
        sections = this.state.sections.map((section) => {
            return { key: section.id, title: section.name, postsURL: "https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?categories=" + section.id }
        });
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={Styles.sheet.subtitleText}>Notifications:</Text>
                    <View>
                        <Switch onValueChange={(value) => this.setState({ pushNotification: value })} />
                    </View>
                    {loadMore}
                </View>
                <FlatList
                    data={authors}
                    renderItem={({ item }) => <SectionListItem title={item.title}
                        onPress={() => this.state.navigate('BrowseArticles',
                            { name: item.title, postsURL: item.postsURL, category: "author" })} />}
                />
                <FlatList
                    data={tags}
                    renderItem={({ item }) => <SectionListItem title={item.title}
                        onPress={() => this.state.navigate('BrowseArticles',
                            { name: item.title, postsURL: item.postsURL, category: "tag" })} />}
                />
                <FlatList
                    data={sections}
                    renderItem={({ item }) => <SectionListItem title={item.title}
                        onPress={() => this.state.navigate('BrowseArticles',
                            { name: item.title, postsURL: item.postsURL, category: "section" })} />}
                />
            </View>
        );
    }
}