import React, { Component } from 'react';
import TodoList from '../../components/todo/TodoList';
import AddTodo from '../../components/todo/AddTodo';

export default class TodoView extends Component {
  render() {
    return (
      <div>
        <AddTodo />
        <TodoList />
      </div>
    )
  }
}