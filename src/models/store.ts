/* eslint-disable @typescript-eslint/no-use-before-define */
import * as mobx from 'mobx';
import { NewTodo } from '../pages/List/NewTodo';
import TodoPage from '../pages/List';
import { TodoList } from '../pages/List/TodoList';
import { StateProviders } from '../concept/StateProviders';

const { observable, computed } = mobx;

class TodoItem {
  @observable
  id: number = 0;

  @observable
  key: number = 0;

  @observable
  name: string = '';

  @observable
  description: string = '';

  @observable
  isCompleted: boolean = false;

  constructor(init?: Partial<TodoItem>) {
    Object.assign(this, init);
  }
}

class Store {
  @observable
  todoItems: TodoItem[] = [];

  @observable
  addingNewTodo: boolean = false;

  @computed
  get totalItemsCount() {
    return store.todoItems.length;
  }

  @computed
  get pendingItemsCount() {
    return store.todoItems.filter(item => !item.isCompleted).length;
  }

  completeItem(recordId: number) {
    this.todoItems[recordId].isCompleted = true;
  }

  addItem(taskName: string, description: string) {
    this.todoItems.push(
      new TodoItem({
        id: store.todoItems.length,
        key: store.todoItems.length,
        name: taskName,
        description,
        isCompleted: false,
      }),
    );
  }
}

// the domain model
export const store = new Store();

// bind domain model into various view model
export const stateProviders = new StateProviders();

stateProviders.bind(TodoPage, (props): TodoPage['StateType'] => {
  return {
    addNewTodo() {
      store.addingNewTodo = true;
    },
    totalItemsCount: store.totalItemsCount,
    pendingItemsCount: store.pendingItemsCount,
  };
});

stateProviders.bind(NewTodo, (props): NewTodo['StateType'] => {
  return {
    onOk(): void {
      store.addItem(this.taskName!, this.description!);
      this.taskName = '';
      this.description = '';
      store.addingNewTodo = false;
    },
    onCancel() {
      store.addingNewTodo = false;
    },
    isOpen: store.addingNewTodo,
  };
});

stateProviders.bind(TodoList, props => {
  return {
    todoItems: mobx.toJS(store.todoItems), // watch theme all
    completeItem(recordId: number): void {
      store.completeItem(recordId);
    },
  };
});
