import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  collapsed: boolean;
}

const LogoPanel = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;
export const Sider: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
      <LogoPanel />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/home">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/list">
            <Icon type="ordered-list" />
            <span>List</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/form">
            <Icon type="form" />
            <span>Form</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/mobx-react-list">
            <Icon type="ordered-list" />
            <span>MobxReactList</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
