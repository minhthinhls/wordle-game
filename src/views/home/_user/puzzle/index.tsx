/**
 ** - Message
 **/
import React from 'react';
import {Tabs} from 'antd';
const {TabPane} = Tabs;

import App from "./components/App"

const Message: React.FC = function () {
  return (
    <>
      <App/>
      <Tabs type="card">
        <TabPane tab="Thông báo cá nhân" key="1">
        </TabPane>
        <TabPane tab="Thông báo hệ thống" key="2">
        </TabPane>
      </Tabs>
    </>
  );
};

export default Message;
