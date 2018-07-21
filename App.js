import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Header from './app/components/Header';
import TaskList from './app/components/TaskList';
import AddTaskButton from './app/components/AddTaskButton';
import ModalTask from './app/components/ModalTask';


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
    };
  }

  toggleModalTaskVisiblity = () => {
    this.setState({isModalTaskVisible: !this.state.isModalTaskVisible})
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
          isVisible={this.state.isModalTaskVisible}
          onHideCallback={this.toggleModalTaskVisiblity}
        />
      </View>
    );
  }
}
