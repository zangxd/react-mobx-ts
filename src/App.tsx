/* eslint-disable react/display-name */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import { BasicLayout } from './layouts/BasicLayout';

export default () => (
  <LocaleProvider locale={enUS}>
    <BrowserRouter>
      <BasicLayout />
    </BrowserRouter>
  </LocaleProvider>
);
