import React from 'react';

import { Button, Table } from 'antd';

import { AutoComponent } from '../../concept/AutoComponent';

const { Column } = Table;

interface TodoItem {
  id: number;
  key: number;
  name: string;
  description: string;
  isCompleted: boolean;
}

interface Props {}

interface State {
  todoItems: TodoItem[];
  completeItem(recordId: number): void;
}

export class TodoList extends AutoComponent<Props, State> {
  render() {
    return (
      <Table dataSource={this.state.todoItems}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Task" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Status"
          dataIndex="isCompleted"
          key="isCompleted"
          render={(text: any, record: TodoItem) => (
            <span>{record.isCompleted ? 'Completed' : 'Pending'}</span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text: any, record: TodoItem) => (
            <Button
              type="primary"
              disabled={record.isCompleted}
              onClick={() => this.state.completeItem(record.id)}
            >
              Done
            </Button>
          )}
        />
      </Table>
    );
  }
}
