export * from './table';

import type {FunctionComponent} from 'react';
import type {RouteComponentProps} from 'react-router-dom';
import type {ThunkDispatch} from 'redux-thunk';
import type {DispatchProp} from 'react-redux';
import type {AnyAction} from 'redux';
import type {ArrowFunc} from "@/type";

export declare interface IReactPropsFC extends DispatchProp, RouteComponentProps {
    /* [[Interface Attributes Placeholder]] */
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
}

export declare type ReactFC<
    IProps = {},
    StateMapper = ArrowFunc<{}>,
    DispatchMapper = ArrowFunc<{}>,
> = FunctionComponent<
    IReactPropsFC
    & IProps
    & ReturnType<StateMapper>
    & ReturnType<DispatchMapper>
>;
