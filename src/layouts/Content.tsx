import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Provider } from 'mobx-react';
import { stateProviders } from '../models/store';
import { createStores } from '../models/todo';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const List = React.lazy(() => import('../pages/List'));
const Form = React.lazy(() => import('../pages/Form'));
const MobxReactList = React.lazy(() => import('../pages/MobxList'));

const ContentPanel = styled(Layout.Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 600px;
`;

const todoStore = createStores();

export const Content: React.StatelessComponent<{}> = () => {
  return (
    <Provider {...todoStore}>
    <ContentPanel>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/list" component={() => <List {...stateProviders.props} />} />

            <Route exact path="/mobx-react-list" component={MobxReactList} />

        </Switch>
      </Suspense>
    </ContentPanel>
    </Provider>
  );
};
