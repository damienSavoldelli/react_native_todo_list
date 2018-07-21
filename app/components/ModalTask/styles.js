import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../styles/color';

export default StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    height: 200,
    justifyContent: 'space-around',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  changeStatusButton: {
    backgroundColor: APP_COLORS.primaryAction,
  },
});
