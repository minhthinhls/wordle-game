import {useCallback} from "react";
import {default as asyncDebounceFn} from "awesome-debounce-promise";

/** Import ES6 TYPES !*/
import type {ValidatorRule} from "rc-field-form/lib/interface";

/**
 ** - Dùng để validate fields từ form thông qua Debounce để hạn chế số Request đến API.
 ** @returns {function(): Promise<void>}
 **/
export const asyncDebounceValidator = <TRule, TValue>(callback: ValidatorRule["validator"]) => {
    return useCallback(asyncDebounceFn(async (rule: TRule, value: TValue | string/*, callback*/) => {
        if (!value) {
            return Promise.resolve();
        }
        if (typeof value === "string") {
            value = value.trim();
        }
        if (!value) {
            return Promise.resolve();
        }
        const response = await callback(rule, value, () => void 0);
        const {errorCode, errorMsg, msg} = response.data || {msg: "Lỗi chưa xác định"};
        if (errorCode) {
            return Promise.reject(new Error(errorMsg?.message || msg));
        }
        return Promise.resolve();
    }, 500), []);
};

export default asyncDebounceValidator;
