import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../styles/color';

export default StyleSheet.create({
  subHeader: {
    backgroundColor: '#111',
    height: 20,
  },
  header: {
    backgroundColor: APP_COLORS.primary,
    shadowColor: APP_COLORS.shadow,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
  },
  textContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: APP_COLORS.primaryText,
    fontSize: 30,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 18,
  },
});
