import React from 'react';
import { List, ListItem, Badge } from 'react-native-elements';

import { TASK } from '../../model';
import { APP_COLORS } from '../../styles/color';

import styles from './styles';

const TaskList = ({ taskList, onPressCallback, onLongPressCallback }) => (
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
              value={task.status}
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

export default TaskList;
