import {withRouter, RouteComponentProps} from 'react-router-dom';
import {ExceptionStatusType} from 'antd/lib/result';
import {Result, Button} from 'antd';
import React from 'react';
import './style.scss';

interface IProperties {
    status?: ExceptionStatusType
}

const statusMap = {
  403: {
    title: '403',
    subTitle: 'Sorry, you are not authorized to access this page.',
    // subTitle: 'Xin lỗi, bạn không có quyền truy cập vào trang này.',
  },
  404: {
    title: '404',
    subTitle: 'Sorry, this page is not exist.',
    // subTitle: 'Xin lỗi, trang bạn truy cập không tồn tại.',
  },
  500: {
    title: '500',
    subTitle: 'Sorry, the server has gone wrong.',
    // subTitle: 'Xin lỗi, máy chủ bị lỗi.',
  }
};

const NoMatch: React.FC<IProperties & RouteComponentProps> = function ({
  history,
  status = '404'
}) {
  return (
    <Result
      status={status}
      extra={<Button type="primary" onClick={history.goBack}>Back</Button>}
      {...statusMap[status]}
    />
  );
};

export default withRouter(NoMatch);
