import React from 'react';

import { translate } from 'react-i18next';

import Navigator from './app/config/routes';
import i18n from './app/config/i18n';

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedNavigator = ({ t }) => <Navigator screenProps={{ t }} onNavigationStateChange={null} />;
const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedNavigator);

export default () => (
  <ReloadAppOnLanguageChange />
);
