import React from 'react';
import { Input, Modal,Form, Button  } from 'antd';

import { fieldsOf } from '../../concept/FieldRef';

interface Props {
 addingNewTodo: boolean,
 addItem: () => {}
}

interface State {
  taskName?: string;
  description?: string;
}

export class NewTodo extends React.Component<Props, State> {
  render() {
    const { addingNewTodo, addItem } = this.props;
    return (
      <Modal
        title="New Task"
        visible={addingNewTodo}
        onOk={() => {addItem(this.state.taskName, this.state.description)}}
      >
        <div style={{ marginBottom: 16 }}>
          <Input placeholder="Input the name of the task" {...fieldsOf(this).taskName} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input.TextArea
            placeholder="Input the description of the task"
            rows={3}
            {...fieldsOf(this).description}
          />
        </div>
      </Modal>
    );
  }
}
