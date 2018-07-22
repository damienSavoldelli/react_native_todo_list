import { createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Home from '../screens/Home';
import Setting from '../screens/Setting';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        headerTitle: 'Settings',
      },
    },
  },
  {
    headerMode: 'screen',
  },
);

export default createStackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
  },
  {
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight },
    headerMode: 'none',
  },
);
