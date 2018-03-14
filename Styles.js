import React from 'react';
import { StyleSheet } from 'react-native';

// The style sheet of how every component in the app will look
export default Styles = 
{sheet: StyleSheet.create({
    boarderedView: {
     flex: 1,
     paddingTop: 22,
     borderRadius: 4,
     borderWidth: 0.5,
     borderColor: '#d6d7da',
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
    buttonStyle: {},
    paragraphText: {
      fontSize: 16,
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
  buttonColour: 'darkgray'
}