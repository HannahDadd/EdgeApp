import React from 'react';
import { Button } from 'react-native';

export default class AuthorDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }
    
    // TODO should there be a way to show what author has written??

    // Follow a tag
    followTag(){
        // For another sprint
    }

    // Return a button that can be pressed to follow a tag
    render() {
        return (
            <Button title={"Follow '" + this.state.name + "' tag"}/>
        )
    }
}