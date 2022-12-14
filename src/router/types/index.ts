import {ROLE} from "@/constants";
import type {FC as FunctionalComponent} from "react";

export interface IMetaProps {
  title?: string;
  requiresAuth?: boolean;
  requiresRoles?: Array<ROLE>;
  isLoginToHome?: boolean;
}

interface IRedirectProps {
  to: string | object;
  from: string;
  push?: boolean;
  exact?: boolean;
  strict?: boolean;
}

interface IRouteConfigProps {
  path: Array<string> | string;
  component: FunctionalComponent<any>;
  exact?: boolean;
  meta?: IMetaProps;
  redirect?: IRedirectProps;
  [propName: string]: any;
}

interface IChildrenRouteProps {
  childrenRoutes?: Array<IRouteConfigProps>;
}

export interface IRouteProps extends IRouteConfigProps, IChildrenRouteProps {}
