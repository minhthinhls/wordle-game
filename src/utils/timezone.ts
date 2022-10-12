import {tz as moment_timezone} from 'moment-timezone';
import moment from 'moment';

const DEFAULT_TIMEZONE = 'ASIA/Ho_Chi_Minh';
const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss Z';

/**
 ** @param {string} [format]
 ** @param {moment.Moment} [date]
 ** @param {string} [timezone]
 ** @returns {Moment}
 **/
export const createMomentByTimezone = (timezone?: string, date?: any, format?: moment.MomentFormatSpecification): moment.Moment => {
    /** Default Constructor !*/
    if (!timezone) {
        return moment_timezone();
    }
    /** Moment-Timezone Constructor with only [Timezone] Parameter !*/
    if (!date) {
        return moment_timezone(timezone);
    }
    /** Moment-Timezone Constructor with both [Date] and [Timezone] Parameters !*/
    if (!format) {
        return moment_timezone(date, timezone);
    }
    /** Moment-Timezone Constructor with [Date], [Format] and [Timezone] Parameters !*/
    return moment_timezone(date, format, timezone);
};

/**
 ** @param {moment.Moment | number | string} [date]
 ** @param {string} [timezone]
 ** @returns {Moment}
 **/
export const createMomentFromDate = (date?: moment.Moment | number | string, timezone?: string): moment.Moment => {
    /** Checking whether date is Timestamp of either Unix-Seconds (10 numbers) or Default-MilliSeconds (13 numbers) !*/
    if (typeof date === "number") {
        date = String(date).length < 13 ? moment.unix(date) : moment(date);
    }

    if (date instanceof moment || date instanceof moment_timezone) {
        /** Moment-Timezone Constructor with [Date: Moment], [Format: String] and [Timezone: String] Parameters !*/
        return createMomentByTimezone(timezone || DEFAULT_TIMEZONE, date || Date.now());
    }

    /** Moment-Timezone Constructor with [Date: String | Number], [Format: String] and [Timezone: String] Parameters !*/
    return createMomentByTimezone(timezone || DEFAULT_TIMEZONE, date || Date.now());
};

/**
 ** @param {moment.Moment | number | string} [date]
 ** @param {string} [timezone]
 ** @param {string} [format]
 ** @returns {string}
 **/
export const formatTimeFromDate = (date?: moment.Moment | number | string, timezone?: string, format?: string): string => {
    /** Checking whether date is Timestamp of either Unix-Seconds (10 numbers) or Default-MilliSeconds (13 numbers) !*/
    if (typeof date === "number") {
        date = String(date).length < 13 ? moment.unix(date) : moment(date);
    }

    if (date instanceof moment || date instanceof moment_timezone) {
        /** Moment-Timezone Constructor with [Date: Moment], [Format: String] and [Timezone: String] Parameters !*/
        return createMomentByTimezone(timezone || DEFAULT_TIMEZONE, date || Date.now()).format(format || DATE_TIME_FORMAT);
    }

    /** Moment-Timezone Constructor with [Date: String | Number], [Format: String] and [Timezone: String] Parameters !*/
    return createMomentByTimezone(timezone || DEFAULT_TIMEZONE, date || Date.now()).format(format || DATE_TIME_FORMAT);
};
