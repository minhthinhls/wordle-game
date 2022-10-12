import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {validateLocalStatus} from '@/store/actions/user';
import PrivateRoute from '@/components/private-route';
import {DispatchProp, connect} from 'react-redux';
import React, {useEffect} from 'react';
import routesMap from './routes';
import CONFIG from '@/config';

const Routes: React.FC<DispatchProp> = function ({dispatch}) {

  useEffect(() => {
    dispatch(validateLocalStatus());
  }, []);

  return (
    <Router basename={CONFIG.baseURL}>
      <Switch>
        {routesMap.map((route, idx) => (
          <PrivateRoute {...route} key={idx}/>
        ))}
      </Switch>
    </Router>
  );
};

export default connect()(Routes);
