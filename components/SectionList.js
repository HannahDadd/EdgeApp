import React from 'react';
import { Text, FlatList } from 'react-native';
import SectionListItem from './SectionListItem';
  
export default class SectionList extends React.PureComponent {
    state = {selected: (new Map())};

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
        });
    };

    _renderItem = ({item}) => (
        <SectionListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        name={item.key}
        navigate={this.props.navigate}
        />
    );

    render() {
        return (
        <FlatList
            data={[
            {key: 'Features'},
            {key: 'Interviews'},
            {key: 'Introducing'},
            {key: 'News'},
            {key: 'Notes on News'},
            {key: 'Culture'},
            {key: 'Theatre'},
            {key: 'Television'},
            {key: 'Video Games'},
            {key: 'Literature'},
            {key: 'Records'},
            {key: 'Singles'},
            {key: 'Albums'},
            {key: 'Rewind'},
            {key: 'Film'},
            {key: 'Cinema'},
            {key: 'Archive & Comment'},
            {key: 'DVD & Blu-ray'},
            {key: 'Live'},
            {key: 'Festivals'},
            {key: 'Comedy'},
            {key: 'Local Music'},
            {key: 'Reviews'},
            {key: 'Previews'}
            ]}
            renderItem={this._renderItem}
            />
        );
    }
}