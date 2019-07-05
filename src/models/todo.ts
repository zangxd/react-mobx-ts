import * as mobx from 'mobx';

const { observable, computed, action } = mobx;

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

class TodoStore {
  @observable
  todoItems: TodoItem[] = [];

  @observable
  addingNewTodo: boolean = false;

  @computed
  get totalItemsCount() {
    return this.todoItems.length;
  }

  @computed
  get pendingItemsCount() {
    return this.todoItems.filter(item => !item.isCompleted).length;
  }

  @action
  completeItem = (recordId: number):void => {
    this.todoItems[recordId].isCompleted = true;
  }

  @action
  addNewTodo = ():void => {
    this.addingNewTodo = true;
  }

  @action
  addItem = (taskName: string, description: string):void => {
    this.todoItems.push(
      new TodoItem({
        id: this.todoItems.length,
        key: this.todoItems.length,
        name: taskName,
        description,
        isCompleted: false,
      }),
    );
    this.addingNewTodo = false;
  }
}

export function createStores() {
  const todoStore = new TodoStore();
  return {
    todo: todoStore,
  };
}
