import React, { Component } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <Text>Settings</Text>
      </ScrollView>
    );
  }
}

export default Setting;
