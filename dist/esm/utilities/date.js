/**
 * file: date.ts
 * description: This file contains the DateUtilities class, which provides utility methods for generating date strings in various formats.
 * It includes methods for generating ISO 8601, RFC 7231, UNIX timestamp, and UTC formatted strings.
 * These methods are useful for formatting dates in a standardized way for use in APIs, databases, and other applications.
 */
import { Checks } from "./checks.js";
class DateUtilities {
    /**
     * Generates a date string in ISO 8601 format.
     *
     * ISO 8601 is an international standard for representing dates and times
     * in a clear and unambiguous manner. It is widely used in various
     * applications, including web APIs and databases.
     *
     * Example output: "2023-10-03T14:28:00Z"
     *
     * @param date - The `Date` object to be converted to an ISO 8601 formatted string. Defaults to the current date and time if not provided.
     * @returns A string representing the date in ISO 8601 format.
     */
    static generateISODateString(date = new Date()) {
        return date.toISOString();
    }
    /**
     * Generates a date string in RFC 7231 format. This is also UTC format.
     *
     * RFC 7231 specifies the format for HTTP-date, which is a standardized
     * representation of date and time used in HTTP headers. This format is
     * based on the obsolete RFC 1123 specification and is commonly referred
     * to as an "RFC timestamp."
     *
     * Example output: "Tue, 03 Oct 2023 14:28:00 GMT"
     *
     * @param date - The `Date` object to be converted to an RFC 7231 formatted string. Defaults to the current date and time if not provided.
     * @returns A string representing the date in RFC 7231 format.
     */
    static generateRFCDateString(date = new Date()) {
        return date.toUTCString();
    }
    /**
     * Generates a UNIX timestamp (number of seconds since the Unix epoch).
     *
     * The Unix epoch is defined as 00:00:00 UTC on 1 January 1970. This format
     * is widely used in computing and programming for representing time.
     *
     * Example output: 1696349280
     *
     * @param date - The `Date` object to be converted to a UNIX timestamp. Defaults to the current date and time if not provided.
     * @returns A number representing the UNIX timestamp.
     */
    static generateUnixTimestampNumber(date = new Date()) {
        return Math.floor(date.getTime() / 1000);
    }
    /**
     * Generates a date string in the locale date format.
     *
     * The locale date format is based on the user's locale settings and may vary
     * depending on the user's location and language preferences. It is useful for
     * displaying dates in a format that is familiar to the user.
     *
     * Example output: "10/3/2023, 2:28:00 PM"
     *
     * @param date - The `Date` object to be converted to a locale date string. Defaults to the current date and time if not provided.
     * @returns A string representing the date in the locale date format.
     */
    static generateLocaleDateString(date = new Date()) {
        return date.toLocaleString();
    }
    /**
     * Generate a `Date` object from a UNIX timestamp.
     */
    static generateDateFromUnixTimestamp(unixTimestamp) {
        return new Date(unixTimestamp * 1000);
    }
    /**
     * Generate a Date object from an ISO 8601 formatted string.
     */
    static generateDateFromISODateString(isoDateString) {
        if (Checks.isEmpty(isoDateString) === true) {
            return new Date();
        }
        return new Date(isoDateString);
    }
    /**
     * Generate a Date object from an RFC 7231 formatted string.
     */
    static generateDateFromRFCDateString(rfcDateString) {
        if (Checks.isEmpty(rfcDateString) === true) {
            return new Date();
        }
        return new Date(rfcDateString);
    }
    /**
     * Generate a Date object from a locale date string.
     * Note: This method may not work as expected in all locales, as the format of the locale date string can vary.
     * It is recommended to use a specific date format for consistency.
     */
    static generateDateFromLocaleDateString(localeDateString) {
        if (Checks.isEmpty(localeDateString) === true) {
            return new Date();
        }
        return new Date(localeDateString);
    }
    /**
     * Add Years to a date.
     * @param date - The date to which years will be added.
     * @param years - The number of years to add.
     * @returns A new Date object with the added years.
     */
    static addYears(date, years) {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }
    /**
     * Add Months to a date.
     * @param date - The date to which months will be added.
     * @param months - The number of months to add.
     * @returns A new Date object with the added months.
     */
    static addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }
    /**
     * Add Weeks to a date.
     * @param date - The date to which weeks will be added.
     * @param weeks - The number of weeks to add.
     * @returns A new Date object with the added weeks.
     */
    static addWeeks(date, weeks) {
        const result = new Date(date);
        result.setDate(result.getDate() + weeks * 7);
        return result;
    }
    /**
     * Add Days to a date.
     * @param date - The date to which days will be added.
     * @param days - The number of days to add.
     * @returns A new Date object with the added days.
     */
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    /**
     * Add Hours to a date.
     * @param date - The date to which hours will be added.
     * @param hours - The number of hours to add.
     * @returns A new Date object with the added hours.
     */
    static addHours(date, hours) {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    }
    /**
     * Add Minutes to a date.
     * @param date - The date to which minutes will be added.
     * @param minutes - The number of minutes to add.
     * @returns A new Date object with the added minutes.
     */
    static addMinutes(date, minutes) {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() + minutes);
        return result;
    }
    /**
     * Add Seconds to a date.
     * @param date - The date to which seconds will be added.
     * @param seconds - The number of seconds to add.
     * @returns A new Date object with the added seconds.
     */
    static addSeconds(date, seconds) {
        const result = new Date(date);
        result.setSeconds(result.getSeconds() + seconds);
        return result;
    }
    /**
     * Add Milliseconds to a date.
     * @param date - The date to which milliseconds will be added.
     * @param milliseconds - The number of milliseconds to add.
     * @returns A new Date object with the added milliseconds.
     */
    static addMilliseconds(date, milliseconds) {
        const result = new Date(date);
        result.setMilliseconds(result.getMilliseconds() + milliseconds);
        return result;
    }
    /**
     * Add Time to a date.
     * @param date - The date to which time will be added.
     * @param years - The number of years to add.
     * @param months - The number of months to add.
     * @param weeks - The number of weeks to add.
     * @param days - The number of days to add.
     * @param hours - The number of hours to add.
     * @param minutes - The number of minutes to add.
     * @param seconds - The number of seconds to add.
     * @param milliseconds - The number of milliseconds to add.
     * @returns A new Date object with the added time.
     */
    static addTime(date, time) {
        date.setFullYear(date.getFullYear() + (time.years !== undefined ? time.years : 0));
        date.setMonth(date.getMonth() + (time.months !== undefined ? time.months : 0));
        date.setDate(date.getDate() + ((time.weeks !== undefined ? time.weeks : 0) * 7) + (time.days !== undefined ? time.days : 0));
        date.setHours(date.getHours() + (time.hours !== undefined ? time.hours : 0));
        date.setMinutes(date.getMinutes() + (time.minutes !== undefined ? time.minutes : 0));
        date.setSeconds(date.getSeconds() + (time.seconds !== undefined ? time.seconds : 0));
        date.setMilliseconds(date.getMilliseconds() + (time.milliseconds !== undefined ? time.milliseconds : 0));
        return date;
    }
    /**
     * Subtract Years from a date.
     * @param date - The date from which years will be subtracted.
     * @param years - The number of years to subtract.
     * @returns A new Date object with the subtracted years.
     */
    static subtractYears(date, years) {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() - years);
        return result;
    }
    /**
     * Subtract Months from a date.
     * @param date - The date from which months will be subtracted.
     * @param months - The number of months to subtract.
     * @returns A new Date object with the subtracted months.
     */
    static subtractMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() - months);
        return result;
    }
    /**
     * Subtract Weeks from a date.
     * @param date - The date from which weeks will be subtracted.
     * @param weeks - The number of weeks to subtract.
     * @returns A new Date object with the subtracted weeks.
     */
    static subtractWeeks(date, weeks) {
        const result = new Date(date);
        result.setDate(result.getDate() - weeks * 7);
        return result;
    }
    /**
     * Subtract Days from a date.
     * @param date - The date from which days will be subtracted.
     * @param days - The number of days to subtract.
     * @returns A new Date object with the subtracted days.
     */
    static subtractDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }
    /**
     * Subtract Hours from a date.
     * @param date - The date from which hours will be subtracted.
     * @param hours - The number of hours to subtract.
     * @returns A new Date object with the subtracted hours.
     */
    static subtractHours(date, hours) {
        const result = new Date(date);
        result.setHours(result.getHours() - hours);
        return result;
    }
    /**
     * Subtract Minutes from a date.
     * @param date - The date from which minutes will be subtracted.
     * @param minutes - The number of minutes to subtract.
     * @returns A new Date object with the subtracted minutes.
     */
    static subtractMinutes(date, minutes) {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() - minutes);
        return result;
    }
    /**
     * Subtract Seconds from a date.
     * @param date - The date from which seconds will be subtracted.
     * @param seconds - The number of seconds to subtract.
     * @returns A new Date object with the subtracted seconds.
     */
    static subtractSeconds(date, seconds) {
        const result = new Date(date);
        result.setSeconds(result.getSeconds() - seconds);
        return result;
    }
    /**
     * Subtract Milliseconds from a date.
     * @param date - The date from which milliseconds will be subtracted.
     * @param milliseconds - The number of milliseconds to subtract.
     * @returns A new Date object with the subtracted milliseconds.
     */
    static subtractMilliseconds(date, milliseconds) {
        const result = new Date(date);
        result.setMilliseconds(result.getMilliseconds() - milliseconds);
        return result;
    }
    /**
     * Subtract Time from a date.
     * @param date - The date from which time will be subtracted.
     * @param time - An object representing the time to subtract, including years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     * @returns A new Date object with the subtracted time.
     */
    static subtractTime(date, time) {
        date.setFullYear(date.getFullYear() - (time.years !== undefined ? time.years : 0));
        date.setMonth(date.getMonth() - (time.months !== undefined ? time.months : 0));
        date.setDate(date.getDate() - ((time.weeks !== undefined ? time.weeks : 0) * 7) - (time.days !== undefined ? time.days : 0));
        date.setHours(date.getHours() - (time.hours !== undefined ? time.hours : 0));
        date.setMinutes(date.getMinutes() - (time.minutes !== undefined ? time.minutes : 0));
        date.setSeconds(date.getSeconds() - (time.seconds !== undefined ? time.seconds : 0));
        date.setMilliseconds(date.getMilliseconds() - (time.milliseconds !== undefined ? time.milliseconds : 0));
        return date;
    }
}
export { DateUtilities };
//# sourceMappingURL=date.js.map