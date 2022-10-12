/** MUST IMPORT ANT DESIGN CSS FIRST !*/
import 'antd/dist/antd.css';
/************************************!*/
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux';
import Routes from './router';
import moment from 'moment';
import store from '@/store';
import './assets/styles/global.scss';

moment.locale('en-us');

import './i18n'; // Needs to be bundled

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={vi_VN}>
        <Suspense fallback={null}>
          <Routes/>
        </Suspense>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
