import React, { Component } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { translate } from 'react-i18next';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('setting:title')
  });

  render() {
    const { t, i18n } = this.props;

    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <Text>{t('setting:title')}</Text>
      </ScrollView>
    );
  }
}

export default translate(['setting', 'common'], { wait: true })(Setting);
