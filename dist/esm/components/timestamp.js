import { Checks } from "../utilities/checks.js";
import { DateUtilities } from "../utilities/date.js";
import { Freezer } from "../utilities/freezer.js";
/**
 * PocketTimestamp represents a timestamp, defaulting to the current date and time.
 * - It can also be an empty string or a number representing a timestamp.
 * - This type is used to represent various date-related properties in the Pocket Network.
 * @example
 * const timestamp = new PocketTimestamp();
 * console.log(timestamp.toISO()); // Output: ISO date string
 */
class PocketTimestamp {
    /**
     * The date property represents the date associated with the timestamp item.
     */
    date;
    /**
     * The constructor initializes the date property with a Date object, a string, or a number.
     * - If the input is invalid, it throws an error.
     * - The date is set to the current date and time by default.
     * - The date is frozen to prevent modification.
     *
     * @param date - The date entry that can be either a Date object, a string, or a number.
     *
     * @example
     * const timestamp = new PocketTimestamp(new Date());
     * console.log(timestamp.toISO()); // Output: ISO date string
     * console.log(timestamp.toLocaleString()); // Output: Locale date string
     * console.log(timestamp.toUNIX()); // Output: UNIX timestamp number
     */
    constructor(date = Date.now()) {
        if (typeof date === "string"
            || typeof date === "number"
            || date instanceof Date
                && Checks.isEmpty(date) === false) {
            this.date = new Date(date);
        }
        else {
            throw new Error("Invalid date entry");
        }
        Freezer.deepFreeze(this);
    }
    /**
     * The toString method returns the date as am ISO string.
     * - It is used to represent the date in a human-readable format.
     * - The output format is "YYYY-MM-DDTHH:mm:ss.sssZ".
     * - The date is in UTC format.
     * - The time zone is represented as "Z" for UTC.
     * - The date is formatted as "YYYY-MM-DD".
     * - The time is formatted as "HH:mm:ss.sss".
     * - The milliseconds are included in the output.
     * @example
     * const timestamp = new PocketTimestamp();
     * console.log(timestamp.toString()); // Output: 2025-04-20T12:34:56.789Z
     */
    toISO() {
        return DateUtilities.generateISODateString(this.date);
    }
    /**
     * The toLocaleString method returns the date as a locale string.
     * - It is used to represent the date in a human-readable format.
     * - The output format is based on the user's locale settings.
     * - The date is formatted as "YYYY-MM-DD".
     * - The time is formatted as "HH:mm:ss".
     * @example
     * const timestamp = new PocketTimestamp();
     * console.log(timestamp.toLocaleString()); // Output: 4/20/2025, 12:34:56 PM
     */
    toLocaleString() {
        return DateUtilities.generateLocaleDateString(this.date);
    }
    /**
     * The toUNIX method returns the date as a UTC string.
     * - It is used to represent the date as a number, in seconds since the Unix epoch (1970-01-01T00:00:00Z).
     * @example
     * const timestamp = new PocketTimestamp();
     * console.log(timestamp.toUNIX()); // Output: 1714025696789
     */
    toUNIX() {
        return DateUtilities.generateUnixTimestampNumber(this.date);
    }
    /**
     * The toRFC method returns the date as an RFC string.
     * - It is used to represent the date in a human-readable format.
     * - The output format is based on the RFC 1123 standard.
     * - The date is formatted as "Day, DD Mon YYYY HH:mm:ss GMT".
     * @example
     * const timestamp = new PocketTimestamp();
     * console.log(timestamp.toRFC()); // Output: Sun, 20 Apr 2025 12:34:56 GMT
     * @see https://tools.ietf.org/html/rfc1123
     */
    toRFC() {
        return DateUtilities.generateRFCDateString(this.date);
    }
    /**
     * The addTime method adds a specified amount of time to the date.
     * It can add years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    addTime({ years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
        const date = DateUtilities.addTime(this.date, {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        });
        return new PocketTimestamp(date);
    }
    /**
     * The subtractTime method subtracts a specified amount of time from the date.
     * It can subtract years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    subtractTime({ years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
        const date = DateUtilities.subtractTime(this.date, {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        });
        return new PocketTimestamp(date);
    }
    static createTimestamp(date = new Date()) {
        return new PocketTimestamp(date);
    }
}
export { PocketTimestamp };
//# sourceMappingURL=timestamp.js.map