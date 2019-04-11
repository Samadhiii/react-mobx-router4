import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Input, Popconfirm } from 'antd';


@inject('store')
@observer
export default class AddTodo extends Component {
  render() {
    const store = this.props.store.todo;
    return (
      <div>
        <Input
          placeholder="添加todolist"
          onChange={(e) => store.newtodo = e.target.value}
          defaultValue={store.newtodo}
          style={{ width: '200px' }}
        />
        <Button type="primary" onClick={store.AddTodo}>添加</Button>
        <Popconfirm title="确认删除?" onConfirm={() => store.removeSelected()}>
          <Button type="danger">删除选中</Button>
        </Popconfirm>
      </div>
    );
  }
}
