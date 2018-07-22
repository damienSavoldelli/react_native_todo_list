import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage } from 'react-native';

import lodash from 'lodash'

import { TASK } from './app/model';

import Header from './app/components/Header';
import TaskList from './app/components/TaskList';
import AddTaskButton from './app/components/AddTaskButton';
import ModalTask from './app/components/ModalTask';
import TextPromp from './app/components/TextPromp';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTaskContainer:{
    justifyContent: 'center',
    alignItems:'center',
  },
  addTaskText:{
    fontSize:35,
    marginTop:100,
    fontWeight:'bold',
    color:'#999'
  }

});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      styles,
      isModalTaskVisible: false,
      isAddTaskPromptVisible: false,
      isRenameTaskPromptVisible: false,
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
    this.setState({promptTaskContent:"", isAddTaskPromptVisible: true});
  }

  hideAddPrompt = () => {
    this.setState({isAddTaskPromptVisible: false});
  }

  onAChangeTextTask = (value) => {
    this.setState({promptTaskContent: value});
  }

  onAddTask = () => {
    let newTaskContent = this.state.promptTaskContent;
    if (newTaskContent !== "") {
      const newTask = {
        id: this.state.idGenrator,
        content: newTaskContent,
        status: TASK.todoStatus
      }

      this.setState({
        list: [...this.state.list, newTask],
        promptTaskContent:"",
        idGenrator: this.state.idGenrator+1
      })
    }

    this.hideAddPrompt();
  }

  displayRenamePrompt = (task) => {
    if (task !== "") {
      this.setState({currentTask: task, promptTaskContent: "", isRenameTaskPromptVisible: true})
    }
  }

  hideRenamePrompt = () => {
    this.setState({isRenameTaskPromptVisible: false, currentTask: {}});
  }

  onRChangeTextTask = (value) => {
    this.setState({promptTaskContent: value});

    console.log("CHANGE PROMPT ", this.state);
  }

  onRenameTask = () => {
    let newTaskContent = this.state.promptTaskContent;
    if (newTaskContent !== "") {
      const updatedTask = this.state.currentTask;
      updatedTask.content = newTaskContent;

      const index = lodash.findIndex(this.state.list, {id:this.state.currentTask.id});

      const updatedTaskList = this.state.list;

      updatedTaskList[index] = updatedTask;
      
      this.setState({ list: updatedTaskList, currentTask: {} }, () => {
        this.hideRenamePrompt();
      });
    }
    this.hideRenamePrompt();    
  }

  RenderTaskList() {
    if (this.state.list.length > 0 ) {
      return (
        <TaskList
            taskList={this.state.list}
            onPressCallback={this.toggleModalTaskVisiblity}
            onLongPressCallback={(task) => this.displayRenamePrompt(task)}
          />
      );
    }
    return (
      <TouchableOpacity
        style={this.state.styles.addTaskContainer}
        onPress={() => this.displayAddPrompt()}
      >
        <Text style={this.state.styles.addTaskText}>Ajouter un tâche</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Header content="Liste des tâches" />
        <ScrollView>
          {this.RenderTaskList()}
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
        <TextPromp 
          isVisible={this.state.isAddTaskPromptVisible}
          onCancelCallback={() => this.hideAddPrompt()}
          onSubmitCallback={() => this.onAddTask()}
          onChangeTextCallback={value => this.onAChangeTextTask(value)}
        />
        <TextPromp 
          isVisible={this.state.isRenameTaskPromptVisible}
          onCancelCallback={() => this.hideRenamePrompt()}
          onSubmitCallback={() => this.onRenameTask()}
          onChangeTextCallback={value => this.onRChangeTextTask(value)}
          title= 'Renomer la tâche'
          defaultValue={this.state.currentTask.content}
        />
      </View>
    );
  }
}
