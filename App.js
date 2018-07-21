import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Header from './app/components/Header';
import TaskList from './app/components/TaskList';
import AddTaskButton from './app/components/AddTaskButton';


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
    };
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Header content="Liste des tâches" />
        <ScrollView>
          <TaskList taskList={this.state.list} />
        </ScrollView>
        <AddTaskButton />
      </View>
    );
  }
}
