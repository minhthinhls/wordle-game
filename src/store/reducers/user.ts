import {USER} from '../constants';
import {LOCAL_STORAGE, ROLE} from '@/constants';
import {setVisitor} from "@/utils/widget";

const {LOGIN} = USER;

export interface IUserRole {
    name: ROLE;
}

export interface IUserState {
    isLogin: boolean;
    isLockScreen: boolean;
    userInfo?: Partial<{
        token: string;
        role: Partial<{
            name: string;
        }>;
    }>;
}

const initialState: IUserState = {
    isLogin: false,
    isLockScreen: false,
    userInfo: undefined,
};

function user(state = initialState, action: any): IUserState {
    switch (action.type) {
        case LOGIN:
            /* Update visitor zopim chat */
            setVisitor();

            const userInfo = action.userInfo;
            if (userInfo?.token) {
                state.isLogin = true;
                window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo));
                window.localStorage.setItem(LOCAL_STORAGE.USERNAME, userInfo.username);
            }
            return {
                ...state,
                userInfo: action.userInfo
            };
        default:
            return state;
    }
}

export default user;
