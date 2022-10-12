import Exception from '@/components/exception';
import React from 'react';
import './style.scss';

const AccessDenied = () => <div className="exception-wrapper"><Exception status={403}/></div>;

export default AccessDenied;
