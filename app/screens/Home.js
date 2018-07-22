import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage } from 'react-native';

import lodash from 'lodash'

import { TASK } from '../model';
import { storageKey } from '../config/keys'

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton';
import ModalTask from '../components/ModalTask';
import TextPromp from '../components/TextPromp';


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

class Home extends Component {
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

  componentWillMount() {
    AsyncStorage.getItem(storageKey).then(storedTasklist =>{
      if (storedTasklist) {
        this.setState({list: JSON.parse(storedTasklist)}, () => {
          this.setState({idGenrator: this.state.list[this.state.list.length -1].id + 1})
        });
      }
    })
  }

  toggleModalTaskVisiblity = task => {
    let currentTask = task;
    if (this.state.isModalTaskVisible) {
      currentTask = {};
    }
    this.setState({isModalTaskVisible: !this.state.isModalTaskVisible, currentTask: currentTask})
  }

  deleteCurrentTask = () => {
    if (this.state.currentTask !== "undefined") {
      const index = lodash.findIndex(this.state.list, {id:this.state.currentTask.id});

      const list = this.state.list;
      list.splice(index, 1);
      
      this.setState({ list: list, currentTask: {} }, () => {
        this.saveTaskList();
      });
    }
    this.toggleModalTaskVisiblity();
  }

  togglStatusTask = () => {
    if (this.state.currentTask !== "undefined") {
      const updatedTask = this.state.currentTask;
      updatedTask.status = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;

      const index = lodash.findIndex(this.state.list, {id:this.state.currentTask.id});

      const updatedTaskList = this.state.list;

      updatedTaskList[index] = updatedTask;
      this.setState({ list: updatedTaskList, isModalTaskVisible: false, currentTask: {} }, () => {
        this.saveTaskList();
      });
    }
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
      }, () => {
        this.saveTaskList();
      });
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
        this.saveTaskList();
      });
    }
    this.hideRenamePrompt();    
  }

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.list));
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
          defaultValue={this.state.currentTask}
        />
      </View>
    );
  }
}

export default Home;
