import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import lodash from 'lodash'

import Header from './app/components/Header';
import TaskList from './app/components/TaskList';
import AddTaskButton from './app/components/AddTaskButton';
import ModalTask from './app/components/ModalTask';
import { TASK } from './app/model';



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const list = [
  {
    id: 0,
    content: 'Aller voir',
    status: 'En cours',
  },
  {
    id: 1,
    content: 'Les dents',
    status: 'En cours',
  },
  {
    id: 2,
    content: 'Ménage',
    status: 'Terminé',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      styles,
      isModalTaskVisible: false,
      currentTask: {}
    };
  }

  toggleModalTaskVisiblity = task => {
    let currentTask = task;
    if (this.state.isModalTaskVisible) {
      currentTask = {};
    }
    this.setState({isModalTaskVisible: !this.state.isModalTaskVisible, currentTask: currentTask})
  }

  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.list, {id:this.state.currentTask.id});

    const list = this.state.list;
    list.splice(index, 1);
    
    this.setState({ list: list, currentTask: {} });

    this.toggleModalTaskVisiblity();
  }

  togglStatusTask = () => {
    const updatedTask = this.state.currentTask;
    updatedTask.status = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;

    const index = lodash.findIndex(this.state.list, {id:this.state.currentTask.id});

    const updatedTaskList = this.state.list;

    updatedTaskList[index] = updatedTask;
    this.setState({ list: updatedTaskList, isModalTaskVisible: false, currentTask: {} });
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Header content="Liste des tâches" />
        <ScrollView>
          <TaskList
            taskList={this.state.list}
            onPressCallBack={this.toggleModalTaskVisiblity}
          />
        </ScrollView>
        <AddTaskButton />
        <ModalTask
          task={this.state.currentTask}
          isVisible={this.state.isModalTaskVisible}
          onHideCallback={this.toggleModalTaskVisiblity}
          onDeleteCallback={this.deleteCurrentTask}
          onChangeStatusCallback={this.togglStatusTask}
        />
      </View>
    );
  }
}
