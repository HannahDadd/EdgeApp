import React from 'react';
import { View, Text, Image } from 'react-native';
//import FCM from "react-native-fcm";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fcm_token: ""
    };
  }

  componentDidMount () {
    // FCM.requestPermissions();
    // FCM.getFCMToken().then(token => {
    //   this.setState({fcm_token:token});
    //   //update your fcm token on server.
    // });
  }

  static navigationOptions = {
    tabBarIcon: <Image
        source={{uri: 'https://www.theedgesusu.co.uk/wp-content/uploads/2017/01/The-Edge-Logo-Transparent.png'}}
        style={{width: 50, height:50}}
      />
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
        <Text>Content coming soon :P</Text>
      </View>
    );
  }
}