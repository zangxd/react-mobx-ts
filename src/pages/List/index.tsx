import React from 'react';
import { Button, Card } from 'antd';
import { AutoComponent } from '../../concept/AutoComponent';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';

interface Props {}
interface State {
  pendingItemsCount: number;
  totalItemsCount: number;
  addNewTodo(): void;
}

export default class List extends AutoComponent<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Card
          title={`Todo List (${this.state.pendingItemsCount} / ${this.state.totalItemsCount})`}
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.state.addNewTodo();
              }}
            >
              {' '}
              New Task
            </Button>
          }
        >
          <TodoList {...this.props} />
        </Card>
        <NewTodo {...this.props} />
      </React.Fragment>
    );
  }
}
