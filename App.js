import React from 'react';
import { View } from 'react-native';
// import { Button as ButtonElement } from 'react-native-elements'; // alias
import Header from './app/components/Header';
import TaskList from './app/components/TaskList';


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
    };
  }

  render() {
    return (
      <View>
        <Header content="Liste des tâches" />
        <TaskList taskList={this.state.list} />
      </View>
    );
  }
}
