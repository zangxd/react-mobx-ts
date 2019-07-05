import React from 'react';
import { Layout, Icon } from 'antd';
import styled from 'styled-components';

interface Props {
  collapsed: boolean;
  toggle?: () => void;
}

const HeaderPanel = styled(Layout.Header)`
  background: #fff;
  padding: 0;
`;

const IconPanel = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

export const Header: React.StatelessComponent<Props> = (props: Props) => {
  const { collapsed, toggle } = props;

  return (
    <HeaderPanel>
      <IconPanel type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
    </HeaderPanel>
  );
};
