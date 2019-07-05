import * as React from 'react';
import { Button, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';

interface Props {
  readonly todo: any
}

@inject('todo')
@observer
export default class MobxList extends React.Component<Props, {}> {
  render() {
    const { todo } = this.props;
    const { pendingItemsCount, totalItemsCount, addNewTodo, addItem, completeItem } = todo;

    console.log(addItem)

    return (
      <React.Fragment>
        <Card
          title={`Todo List (${pendingItemsCount} / ${totalItemsCount})`}
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                addNewTodo();
              }}
            >
              {' '}
              New Task
            </Button>
          }
        >
          <TodoList {...todo} completeItem={completeItem} />
        </Card>
        <NewTodo {...todo} addItem={addItem} />
      </React.Fragment>
    );
  }
}
