import React from 'react';

import { Button, Table } from 'antd';

const { Column } = Table;

interface TodoItem {
  id: number;
  key: number;
  name: string;
  description: string;
  isCompleted: boolean;
}

export class TodoList extends React.Component {
  render() {
    const { todoItems, completeItem } = this.props;
    console.log(this.props);
    return (
      <Table dataSource={todoItems}>
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
              onClick={() => completeItem(record.id)}
            >
              Done
            </Button>
          )}
        />
      </Table>
    );
  }
}
