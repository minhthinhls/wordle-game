import axios, {AxiosError} from 'axios';
import {message, notification} from 'antd';
import CONFIG from '@/config';
import store from '@/store';

/** Import ES6 Custom Types Dependencies !*/
import type {PlainObject} from "@types";
import {ERROR_CODE, LOCAL_STORAGE} from "@/constants";

export declare interface IResponseData<ResponseData = any> extends PlainObject {
    msg: string;
    success: boolean;
    errorCode: number;
    data: ResponseData;
}

let exiting = false;

function handleError(error: AxiosError): void {
    if (axios.isCancel(error)) {
        return console.error(error);
    }
    const response = error.response;
    return notification.error({
        message: `Error Code: ${response?.status ?? -1}`,
        description: response?.statusText ?? 'Server Errors',
    });
}

const httpInstance = axios.create({
    timeout: 60000,
    baseURL: CONFIG.http.baseURL,
    /** Do not allow cookie anymore, since access Static Resource on the same Origin Address
     ** will reset Session Cookie, hence User will be kicked out during HTTP Server Behaviour !*/
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

httpInstance.defaults.headers.common.isLoading = true;
httpInstance.defaults.headers.common.successAlert = false;
httpInstance.defaults.headers.common.errorAlert = false;
Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use(function (config) {
    const method = config.method;
    const userState = store.getState().user.userInfo;

    config.headers.token = userState?.token;

    const data: {[k: string]: any} = {};

    if (method === 'post' || method === 'put') {
        if (config.data instanceof FormData) {
            for (const key in data) {
                config.data.append(key, data[key]);
            }
        } else {
            config.data = Object.assign(data, config.data);
        }
    }

    return config;
}, function (error) {
    handleError(error);
    return Promise.reject(error);
});

httpInstance.interceptors.response.use(function (res) {
    const headers = res.config.headers;
    const data: IResponseData = res.data;

    /** Download file excel */
    if (res.headers['content-type'].indexOf('spreadsheetml') > 0) {
        const fileName = res.headers["content-disposition"].split("filename*=UTF-8")[1];
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        return res;
    }

    if (!data.success && headers.errorAlert) {
        /** Do not return notification for Email Not Verified error */
        if (data.errorCode !== ERROR_CODE.UNHANDLED_ERROR) {
            notification.error({
                message: `Error code: ${data.errorCode ?? -1}`,
                description: data.msg ?? 'Server Errors',
            });
        }
    }

    if (data.success && headers.successAlert) {
        message.success(data.msg ?? 'Success');
    }

    if (data.errorCode === 401 && !exiting && localStorage.getItem(LOCAL_STORAGE.USER)) {
        exiting = true;
        const logout = () => void 0;
        setTimeout(logout, 2000);
    }

    return res;
}, function (error) {
    handleError(error);
    return Promise.reject(error);
});

export default httpInstance;
