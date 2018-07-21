import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { APP_COLORS } from '../../styles/color';

function addTaskAction() {
  console.log('add task');
}

const addTaskButton = () => (
  <ActionButton
    buttonColor={APP_COLORS.primaryAction}
    Icon={<Icon color={APP_COLORS.primaryText} name="add" />}
    onPress={() => addTaskAction()}
  />
);

export default addTaskButton;
