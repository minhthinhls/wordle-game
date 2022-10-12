import moment, {Moment} from 'moment';

export declare interface IWeek {
    weekOrderName: string;
    weekDateName: string;
    fromDate: Moment,
    toDate: Moment,
}

export const FORMAT_MONTH = 'YYYY-MM';
export const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_DATE_MINUTE = 'YYYY-MM-DD HH:mm';
export const FORMAT_DATE_MINUTE_SECOND = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_DATE = 'YYYY-MM-DD';
export const FORMAT_DATE_MONTH_YEAR = 'DD/MM/YYYY';

export const DATE_WEEK: any = [
    moment().subtract(7, 'day'),
    moment()
];
export const DATE_YEAR: any = [
    moment().startOf('year'),
    moment().endOf('year')
];
export const DATE_YESTERDAY: any = [
    moment().subtract(1, 'days'),
    moment().subtract(1, 'days'),
];
export const YESTERDAY = moment().subtract(1, 'days');
export const TODAY = moment();

/** - Determine whether the incoming time is less than today's timestamp !*/
export function isBefore(current: moment.MomentInput | null): boolean {
    const today = new Date().setHours(0, 0, 0, 0);
    return moment(current).isBefore(today);
}

export function formatDate(date: moment.MomentInput): string {
    return moment(date).format(FORMAT_DATE);
}

export function formatDateTime(date: moment.MomentInput): string {
    return moment(date).format(FORMAT_DATETIME);
}

export function formatDateMinute(date: moment.MomentInput, format?: string): string {
    return moment(date).format(format || FORMAT_DATE_MINUTE);
}

export function fromNow(
    startDate: moment.MomentInput,
    endDate: moment.MomentInput
): number {
    const start = moment(startDate).valueOf();
    const end = moment(endDate || Date.now()).valueOf();
    const n = end - start;
    return Math.trunc(n / (1000 * 60 * 60 * 24));
}

export function getWeekDateName(startDayOfWeek: Moment): string {
    const formatter = 'DD/MM/YYYY';
    return `${startDayOfWeek.format(formatter)} - ${startDayOfWeek.clone().endOf('isoWeek').format(formatter)}`;
}

export function getWeeksOfMonth(dayOfMonth: Moment): IWeek[] {
    const firstDayOfMonth = dayOfMonth.clone().startOf('month');
    let firstMonday = firstDayOfMonth.isoWeekday(8);
    if (firstMonday.date() > 7) {
        firstMonday = firstMonday.isoWeekday(-6);
    }

    const firstWeekStartDay = firstMonday;
    const secondWeekStartDay = firstWeekStartDay.clone().add(1, 'week');
    const thirdWeekStartDay = firstWeekStartDay.clone().add(2, 'week');
    const fourthWeekStartDay = firstWeekStartDay.clone().add(3, 'week');

    const monthName = firstWeekStartDay.format('M');
    return [
        {
            weekOrderName: `Tuần 1 - Tháng ${monthName}`,
            weekDateName: getWeekDateName(firstWeekStartDay),
            fromDate: firstWeekStartDay,
            toDate: firstWeekStartDay.clone().endOf('isoWeek')
        },
        {
            weekOrderName: `Tuần 2 - Tháng ${monthName}`,
            weekDateName: getWeekDateName(secondWeekStartDay),
            fromDate: secondWeekStartDay,
            toDate: secondWeekStartDay.clone().endOf('isoWeek')
        },
        {
            weekOrderName: `Tuần 3 - Tháng ${monthName}`,
            weekDateName: getWeekDateName(thirdWeekStartDay),
            fromDate: thirdWeekStartDay,
            toDate: thirdWeekStartDay.clone().endOf('isoWeek')
        },
        {
            weekOrderName: `Tuần 4 - Tháng ${monthName}`,
            weekDateName: getWeekDateName(fourthWeekStartDay),
            fromDate: fourthWeekStartDay,
            toDate: fourthWeekStartDay.clone().endOf('isoWeek')
        },
    ];
}
