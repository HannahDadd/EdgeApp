import React from 'react';
import { StyleSheet } from 'react-native';

// The style sheet of how every component in the app will look
export default Styles = 
{sheet: StyleSheet.create({
    boarderedColouredColView: {
      flex: 1, 
      flexDirection: 'column', 
      padding: 10, 
      backgroundColor: 'white', 
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: '#d6d7da'
    },
    boarderedColouredRowView: {
      flex: 1, 
      flexDirection: 'row',
      justifyContent:'space-between',
      padding: 10, 
      backgroundColor: 'white', 
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: '#d6d7da'
    },
    searchBoxArea: {
      backgroundColor: 'white',
      padding: 10,
    },
    item: {
      padding: 10,
      height: 44,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sectionTitleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    buttonStyle: {},
    paragraphText: {
      fontSize: 16,
    },
    searchText: {
      fontSize: 18,
      fontStyle: 'italic',
      color: 'black',
    },
    subtitleText: {
      fontSize: 18,
      fontStyle: 'italic',
      color: '#CDCDCD',
    },
    stackNavButton: {},
    tagNavText: {},
    viewStyle: {flex: 1, flexDirection: 'column', padding: 10}
  }),
  buttonColour: 'purple'
}