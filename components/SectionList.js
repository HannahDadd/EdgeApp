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
        />
    );

    render() {
        return (
        <FlatList
            data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            ]}
            renderItem={this._renderItem}
            />
        );
    }
}