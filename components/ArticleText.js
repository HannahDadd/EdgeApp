import React from 'react';
import { WebView } from 'react-native';

export default class ArticleText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            content: this.props.content
        };
      }

    // Article box is the articles title and featured image
    render() {
        return (
            <WebView source={{ html: '<p>Here I am</p>' }} style={{marginTop: 20}}/>
        )
    }
}