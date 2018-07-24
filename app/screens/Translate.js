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

class Translate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('translation:title')
  });

  changeLanguage = (lang) => {
    const {i18n} = this.props;

    i18n.changeLanguage(lang);
    this.props.navigation.goBack(null);
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <List containerStyle={styles.list}>
          <ListItem
            key={1}
            title={t('common:actions.toggleToEnglish')}
            onPress={() => this.changeLanguage('en')}
          />
          <ListItem
            key={2}
            title={t('common:actions.toggleToFrench')}
            onPress={() => this.changeLanguage('fr')}
          />
        </List>
      </ScrollView>
    );
  }
}

export default translate(['translation', 'common'], { wait: true })(Translate);
