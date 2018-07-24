import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { translate } from 'react-i18next';


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
  },
});

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('setting:title')
  });

  onTranslatePress = () => {
    this.props.navigation.navigate('Translate');
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <List containerStyle={styles.list}>
          <ListItem
            key={1}
            title={t('setting:language')}
            onPress={() => this.onTranslatePress()}
          />
        </List>
      </ScrollView>
    );
  }
}

export default translate(['setting', 'common'], { wait: true })(Setting);
