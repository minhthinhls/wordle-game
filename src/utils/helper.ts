import {message} from 'antd';
import countryCodes from "@/constants/country_codes.json";

/**
 ** - Calculate the percentage
 ** @example
 ** totalPercentage(8589934592, 225492992)  // => 98
 ** @returns {number}
 **/
export function totalPercentage(totalmem: number, freemem: number): number {
    return Math.floor((totalmem - freemem) / totalmem * 100);
}

/**
 ** - Full screen browser
 ** @returns {void}
 **/
export function toFullScreen(): void {
    try {
        const _DocumentElement = document.documentElement as any;
        if (_DocumentElement.requestFullscreen) {
            _DocumentElement.requestFullscreen();
        } else if (_DocumentElement.webkitRequestFullScreen) {
            _DocumentElement.webkitRequestFullScreen();
        } else if (_DocumentElement.mozRequestFullScreen) {
            _DocumentElement.mozRequestFullScreen();
        } else if (_DocumentElement.msRequestFullscreen) {
            _DocumentElement.msRequestFullscreen();
        }
    } catch {
        message.warn('The browser you are using does not support full screen');
    }
}

/**
 ** - Exit full screen browser
 ** @returns {void}
 **/
export function exitFullScreen(): void {
    try {
        const _Document = document as any;
        if (_Document.exitFullscreen) {
            _Document.exitFullscreen();
        } else if (_Document.mozCancelFullScreen) {
            _Document.mozCancelFullScreen();
        } else if (_Document.webkitCancelFullScreen) {
            _Document.webkitCancelFullScreen();
        } else if (_Document.msExitFullscreen) {
            _Document.msExitFullscreen();
        }
    } catch {
        message.warn('The browser you are using does not support exit full screen, please press ESC');
    }
}

/**
 ** - Exit full screen browser
 ** @param {string} fromChar
 ** @param {string} toChar
 ** @returns {Array<string>}
 **/
export function _GenerateCharArrayFromTo(fromChar: string, toChar: string): Array<string> {
    const charArray = [];
    const _FromCharCode = fromChar.charCodeAt(0);
    const _ToCharCode = toChar.charCodeAt(0);

    if (_FromCharCode > _ToCharCode) {
        throw new EvalError("From Character Code cannot be LARGER than To Character Code !");
    }

    for (let i = _FromCharCode; i <= _ToCharCode; i++) {
        charArray.push(String.fromCharCode(i));
    }
    return charArray;
}

/**
 ** - A function generate a Custom Random String Code
 ** @param {number} codeLength
 ** @returns {string}
 **/
export function randomCode(codeLength: number = 4): string {
    const CODE = 'abcdefghijklmnopqrstuvwxyz123456789' || [_GenerateCharArrayFromTo('a', 'z'), _GenerateCharArrayFromTo('1', '9')].flat().join("");
    let data = '';

    for (let i = 0; i < codeLength; i++) {
        const random = Math.floor(Math.random() * CODE.length);
        data += CODE[random];
    }

    return data;
}

export function parsePhoneNumber(phoneNumber: string) {
    if (!phoneNumber) {
        return {code: '', phone: ''};
    }

    // parse phone number
    const countryCodeList = (countryCodes as Array<{
        name: string, dial_code: string, code: string
    }>);

    const countryCode = countryCodeList.find(countryCode => phoneNumber.indexOf(countryCode.dial_code) === 0);

    if (countryCode) {
        return {
            code: countryCode.dial_code,
            phone: phoneNumber.slice(countryCode.dial_code.length)
        };
    }

    // parse error
    return {code: '', phone: phoneNumber};
}

export function removeAccents(str: string) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
