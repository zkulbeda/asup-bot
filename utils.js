import {DateTime} from "luxon";
/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {number} daystamp
 */
export function getDayStamp(year, month, day) {
    return Math.round(DateTime.local().set({year, month, day}).startOf('day').toSeconds() / (60 * 60 * 24));
}

/**
 *
 * @param {DateTime} time
 * @returns {number}
 */
export function getDayStampByDateTime(time) {
    return Math.round(time.startOf('day').toSeconds() / (60 * 60 * 24));
}


/**
 *
 * @param duration
 * @param start_from
 * @returns {DateTime}
 */
export function getTimeByDuration(duration, start_from,){
    start_from = start_from || DateTime.local().startOf('day');
    return start_from.plus(duration);
}

/**
 *
 * @param d1
 * @param d2
 * @param start_from
 * @returns {Interval}
 */
export function getIntervalByDurations(d1,d2,start_from){
    start_from = start_from || DateTime.local().startOf('day');
    return Interval.fromDateTimes(start_from.plus(d1), start_from.plus(d2));
}