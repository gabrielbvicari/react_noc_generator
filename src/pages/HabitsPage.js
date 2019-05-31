import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import HabitsList from '../components/HabitsList';
import habitsJSON from '../../habits.json';

export default class HabitsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: []
    }
  }

  componentDidMount() {
    this.setState({
      habits: habitsJSON
    });
  }

  render() {
    return (
      <ScrollView>
        <HabitsList habits = { this.state.habits }/>
      </ScrollView>
    );
  }
}
