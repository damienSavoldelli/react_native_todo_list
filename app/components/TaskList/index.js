import React from 'react';
import { List, ListItem, Badge } from 'react-native-elements';

import { translate } from 'react-i18next';
import { TASK } from '../../model';
import { APP_COLORS } from '../../styles/color';

import styles from './styles';

const TaskList = (props) => {
  const {
    taskList, onPressCallback, onLongPressCallback, t,
  } = props;

  return (
    <List containerStyle={styles.list}>
      {taskList.map(task => (
        <ListItem
          key={task.id}
          title={task.content}
          onPress={() => onPressCallback(task)}
          onLongPress={() => onLongPressCallback(task)}
          badge={{
            element: (
              <Badge
                value={t(`home:tasklist.${task.status}`)}
                containerStyle={
                  task.status === TASK.todoStatus ? { backgroundColor: APP_COLORS.accent } : { backgroundColor: APP_COLORS.lightPrimaryColor }
                }
              />
            ),
          }}
        />
      ))}
    </List>
  );
};

export default translate(['home', 'common'], { wait: true })(TaskList);
