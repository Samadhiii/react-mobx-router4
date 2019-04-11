import { observable, computed, action } from 'mobx';
import { message } from 'antd';

class TodoStore {
  @observable todos = []; // todos列表
  @observable newtodo = ''; // 新添加的todo
  @observable selectedRowKeys = []; // 选择行的key
  @observable loading = true; // Table-loading
  @observable _key = 0; // key
  @observable total = 0; // 数据量

  @action fetchTodos() {
    this.total = 0;
    this._key = 0;
    this.todos = [];
    this.loading = false;
  }

  @action fetchTodoAdd() {
    this.total += 1;
    this.todos.push({
      key: this._key,
      todo: this.newtodo,
    });
  }

  @action fetchTodoRemove(keyArr) {
    if (keyArr) {
      if (keyArr.length > 1) {
        this.todos = this.todos.filter(item => this.selectedRowKeys.indexOf(item.key) === -1);
        this.selectedRowKeys = [];
      } else {
        this.todos = this.todos.filter(item => item.key !== keyArr[0]);
      }
      this.total -= keyArr.length;
      message.success('删除成功！');
    }
  }

  // 添加
  @action AddTodo = () => {
    this._key += 1;
    this.fetchTodoAdd();
  };

  // checkbox选择
  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  // 删除单个
  @action remove(key) {
    this.fetchTodoRemove([key]);
  }

  // 删除选择
  @action removeSelected() {
    this.fetchTodoRemove(this.selectedRowKeys);
  }

  // 计算长度
  @computed get TodoListCount() {
    return this.todos.length;
  }
}
export default TodoStore;
