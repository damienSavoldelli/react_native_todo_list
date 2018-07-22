import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { APP_COLORS } from '../../styles/color';


const addTaskButton = ({ onPressCallback }) => (
  <ActionButton
    buttonColor={APP_COLORS.primaryAction}
    Icon={<Icon color={APP_COLORS.primaryText} name="add" />}
    onPress={() => onPressCallback()}
  />
);

export default addTaskButton;
