import {Switch, Route, Redirect, withRouter, RouteComponentProps} from 'react-router-dom';
import AccessDined from '@/views/exception/403';
import __RootReducer__ from '@/store/reducers';
import {IRouteProps} from '@/router/types';
import {HOME} from '@/router/constants';
import {connect} from 'react-redux';
import CONFIG from '@/config';
import qs from 'query-string';
import React from 'react';

type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps;

const PrivateRoute: React.FC<Props> = function ({
  component: Component,
  childrenRoutes,
  isLogin,
  userInfo,
  location,
  ...rest
}) {
  const {meta} = rest;
  if (meta) {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`;
    } else {
      document.title = CONFIG.title;
    }
  }

  /** - Verify permissions !*/
  const auth = function () {
    if (meta?.requiresAuth) {
      return Boolean(isLogin);
    }
    return true;
  }();

  if (meta?.isLoginToHome && isLogin) {
    const redirectUrl = qs.parse(location.search).redirectUrl as string;
    const url = redirectUrl || HOME.ROOT.path;
    return <Redirect to={url}/>;
  }

  /** @ts-ignore */
  if (!userInfo || meta?.requiresRoles && !meta?.requiresRoles.includes(userInfo?.role?.name)) {
    return <AccessDined/>;
  }

  return (
    <Route render={(props) => {
      return (
        auth ? (
          <Component {...props} {...rest}>
            {Array.isArray(childrenRoutes) ? (
              <Switch>
                {childrenRoutes.map((route, idx: number) => (
                  <PrivateRouteComponent {...route} key={idx}/>
                ))}
              </Switch>
            ) : null}
          </Component>
        ) : (
          <Redirect to={{
            pathname: '/',
            search: `?redirectUrl=${props.location.pathname}`
          }}/>
        )
      );
    }}/>
  );
};

const mapStateToProps = (state: ReturnType<typeof __RootReducer__>) => {
  return {
    isLogin: state.user.isLogin,
    userInfo: state.user.userInfo
  };
};

export const PrivateRouteComponent = connect(mapStateToProps)(withRouter(PrivateRoute));

export default PrivateRouteComponent;
