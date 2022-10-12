/**
 ** @file Store Main Entry.
 ** @since 1.0.0
 ** @author edgar <huynhleminhthinh@gmail.com>
 **/
import thunk from 'redux-thunk';
import __RootReducer__ from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import * as Actions from "@/store/actions";

/** Import Pre-Defined Types Helper !*/
import type {Dispatch} from 'redux';

/** Custom Types Helper Function ~!*/
export declare type StorageFn<T> = (storage: ReturnType<typeof __RootReducer__>) => T;
export const __StorageProvider__ = <T>(callback: StorageFn<T>): StorageFn<T> => {
    return callback;
};

/** Custom Types Helper Function ~!*/
export declare type DispatchFn<T> = (dispatch: Dispatch, actions: typeof Actions) => T;
export const __DispatchProvider__ = <F extends DispatchFn<T>, T>(callback: F): (dispatch: Dispatch) => ReturnType<F> => {
    return (dispatch) => callback(dispatch, Actions) as ReturnType<F>;
};

const store = createStore(
    __RootReducer__,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
);

export default store;
