import React from 'react';
import { Layout } from 'antd';

import { Header } from './Header';
import { Sider } from './Sider';
import { Content } from './Content';

interface State {
  collapsed: boolean;
}

export class BasicLayout extends React.Component<{}, State> {
  state: State = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <Sider collapsed={collapsed} />
        <Layout>
          <Header collapsed={collapsed} toggle={this.toggle} />
          <Content />
        </Layout>
      </Layout>
    );
  }
}
