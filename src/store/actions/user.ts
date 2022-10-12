import {LOCAL_STORAGE} from '@/constants';
import {isPlainObject} from 'lodash';
import {USER} from '../constants';
import {Dispatch} from 'redux';
import config from '@/config';
import {setVisitor} from "@/utils/widget";

const {LOGIN} = USER;

export function setUser(userInfo: any = {}) {
    return {
        type: LOGIN,
        userInfo: userInfo
    };
}

const serviceLoginByToken = (token: string) => Promise.resolve(token);
const serviceLogout = () => Promise.resolve();

/**
 ** - Token login
 **/
export function loginByToken(token: string) {
    return function (dispatch: Dispatch) {
        return serviceLoginByToken(token).then((res: any) => {
            if (res.data.success) {
                const userInfo = res.data.data.userInfo;
                return dispatch(setUser(userInfo));
            }
            return dispatch(setUser());
        });
    };
}

/**
 ** - Logout
 **/
export function logout() {
    serviceLogout()
        .finally(() => {
            const localStorageWhiteList = [LOCAL_STORAGE.USERNAME, LOCAL_STORAGE.LNG];
            const localStorageLen = window.localStorage.length;
            const allLocalStorageKey: string[] = [];

            for (let i = 0; i < localStorageLen; i++) {
                const key = window.localStorage.key(i) as string;
                allLocalStorageKey.push(key);
            }

            allLocalStorageKey.forEach(keyName => {
                if (localStorageWhiteList.indexOf(keyName) === -1) {
                    window.localStorage.removeItem(keyName);
                }
            });
            window.sessionStorage.clear();
            window.location.reload();

            /* Update visitor zopim chat */
            setVisitor();
        });
}

/**
 ** - Github Auth
 **/
export function githubAuthz() {
    const url = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${config.github.callbackURL}&client_id=${config.github.clientId}`;
    window.location.replace(url);
}

/**
 ** - Verify local login status
 **/
export function validateLocalStatus() {
    let userInfo = {};
    try {
        userInfo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER) as string);
        if (!isPlainObject(userInfo)) {
            userInfo = {};
        }
    } catch (error) {
        // Do-nothing
    }
    return setUser(userInfo);
}
