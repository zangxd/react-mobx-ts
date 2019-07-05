import React from 'react';
import { Input, Modal } from 'antd';
import { AutoComponent } from '../../concept/AutoComponent';

import { fieldsOf } from '../../concept/FieldRef';

interface Props {}

interface State {
  taskName?: string;
  description?: string;
  isOpen: boolean;
  onOk(): void;
  onCancel(): void;
}

export class NewTodo extends AutoComponent<Props, State> {
  render() {
    return (
      <Modal
        title="New Task"
        visible={this.state.isOpen}
        onOk={() => this.state.onOk()}
        onCancel={() => this.state.onCancel()}
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
