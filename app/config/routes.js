import { StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Home from '../screens/Home';
import Setting from '../screens/Setting';

const HomeStack = StackNavigator(
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

export default StackNavigator(
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
