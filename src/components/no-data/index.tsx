import NoDataSvg from '@/assets/img/common/no-data.svg';
import {Button, Result} from 'antd';
import React from 'react';
import './style.scss';

interface IProperties {
  onClick(e: React.MouseEvent): void;
  message?: string;
}

const NoData: React.FC<IProperties> = ({onClick, message = 'No data'}) => {
  return (
    <Result
      className="no-data"
      icon={<img src={NoDataSvg} className="udn" alt=""/>}
      title={message}
      extra={<Button type="primary" onClick={onClick}>Create Now</Button>}
      status="info"
      style={{marginTop: '50px'}}
    />
  );
};


export default React.memo(NoData);
