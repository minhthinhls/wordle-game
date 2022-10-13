import {LOCAL_STORAGE, ROLE} from "@/constants";
import {IUser} from "@/store/reducers/user";

/**
 ** Format balance
 ** @param {number} number
 ** @param {number} fixed
 ** @returns {string}
 **/
export function formatNumber(number: string | number, fixed = 2): string {
    const numberString = '' + (number || '0');
    const numberValue = parseFloat(numberString);

    if (isNaN(numberValue)) {
        return 'NaN';
    }

    return numberValue.toFixed(fixed)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace('.00', '');
}

/**
 ** Format balance
 ** @param {number} value
 ** @param {number} fixed
 ** @returns {string}
 **/
export function formatBalance(value: number, fixed = 0): string {
    let userInfo: IUser;
    let denominator = 1000;
    try {
        userInfo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER) as string);
        if (userInfo.role.name !== ROLE.MEMBER) {
            denominator = 1;
        } else {
            denominator = 1000;
            fixed = 2;
        }
    } catch (error) {
        /** Do something here */
    }

    return formatNumber(value / denominator, fixed);
}
