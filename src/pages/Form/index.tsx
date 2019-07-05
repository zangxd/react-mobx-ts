import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { fieldsOf } from '../../concept/FieldRef';

interface State {
  userName?: {
    firstName?: string;
    lastName?: string;
  };
  password?: string;
}

export default class FormPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Form layout="inline" style={{ margin: '16px 16px' }}>
        <Form.Item label="first name">
          <Input placeholder="Input first name" {...fieldsOf(this).userName.firstName} />
        </Form.Item>
        <Form.Item label="last name">
          <Input placeholder="Input last name" {...fieldsOf(this).userName.lastName} />
        </Form.Item>
        <Form.Item label="password">
          <Input placeholder="Input password" {...fieldsOf(this).password} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              alert(JSON.stringify(this.state));
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
