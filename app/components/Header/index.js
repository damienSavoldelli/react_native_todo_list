import React from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';

import styles from './styles';

const Header = ({ content, onPressCallback }) => (
  <View>
    <View style={styles.subHeader} />
    <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={onPressCallback}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require('./images/gear.png')}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  </View>
);

export default Header;
