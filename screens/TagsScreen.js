import React from 'react';
import { Text, ScrollView, View, Button, FlatList } from 'react-native';
import FollowButton from '../components/FollowButton';
import Styles from '../Styles';
import SectionListItem from '../components/SectionListItem';

export default class TagsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagIDs: this.props.navigation.state.params.tagIDs,
            tags: [],
            navigate: this.props.navigation.navigate
        };
    }

    // Get tags from IDs on load
    componentDidMount() {
        for (var i = 0; i < this.state.tagIDs.length; i++) {
            this.getTagsFromURL(this.state.tagIDs[i] + "");
        }
    }

    // Set the articles based on the postURL
    getTagsFromURL(tagID) {
        fetch('https://www.theedgesusu.co.uk/wp-json/wp/v2/tags/' + tagID, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(responseJson => {
                this.setState({ tagIDs: this.state.tags.push(responseJson) });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        // Display the tags on the page wiht URL to show articles
        let data = []
        data = this.state.tags.map((tag) => {
            return { key: tag.id, title: tag.name, postsURL: "https://www.theedgesusu.co.uk/wp-json/wp/v2/posts?tags=" + tag.id }
        });
        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <SectionListItem title={item.title}
                        onPress={() => this.state.navigate('BrowseArticles',
                            { name: item.title, id: item.key, postsURL: item.postsURL, isSection: false, category: "tag" })} />}
                />
            </View>
        );
    }
}