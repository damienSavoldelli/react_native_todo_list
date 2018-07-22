import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import lodash from 'lodash'

import { TASK } from './app/model';

import Header from './app/components/Header';
import TaskList from './app/components/TaskList';
import AddTaskButton from './app/components/AddTaskButton';
import ModalTask from './app/components/ModalTask';
import AddTaskPromp from './app/components/AddTaskPromp';


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
      isPromptTaskVisible: false,
      promptTaskContent: '',
      currentTask: {},
      idGenrator: 0,
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

  displayAddPrompt = () => {
    this.setState({isPromptTaskVisible: true});
  }

  hideAddPrompt = () => {
    this.setState({isPromptTaskVisible: false});
  }

  onAChangeTextTask = (value) => {
    this.setState({promptTaskContent: value});

    console.log("CHANGE PROMPT ", this.state);
  }

  onAddTask = () => {
    let newTaskContent = this.state.promptTaskContent;
    if (newTaskContent !== "") {
      const newTask = {
        id: this.state.idGenrator,
        content: newTaskContent,
        status: TASK.todoStatus
      }

      this.setState({list: [...this.state.list, newTask], idGenrator: this.state.idGenrator++})
    }

    this.hideAddPrompt();
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Header content="Liste des tâches" />
        <ScrollView>
          <TaskList
            taskList={this.state.list}
            onPressCallback={this.toggleModalTaskVisiblity}
          />
        </ScrollView>
        <AddTaskButton 
          onPressCallback={() => this.displayAddPrompt()}
        />
        <ModalTask
          task={this.state.currentTask}
          isVisible={this.state.isModalTaskVisible}
          onHideCallback={this.toggleModalTaskVisiblity}
          onDeleteCallback={this.deleteCurrentTask}
          onChangeStatusCallback={this.togglStatusTask}
        />
        <AddTaskPromp 
          isVisible={this.state.isPromptTaskVisible}
          onCancelCallback={() => this.hideAddPrompt()}
          onSubmitCallback={() => this.onAddTask()}
          onChangeTextCallback={value => this.onAChangeTextTask(value)}
        />
      </View>
    );
  }
}
