import { Checks } from "../utilities/checks.js";
import { DateUtilities } from "../utilities/date.js";
import { Freezer } from "../utilities/freezer.js";
/**
 * PocketTimestamp represents a timestamp item that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
class PocketTimestamp {
    /**
     * The date property represents the date associated with the timestamp item.
     */
    date;
    /**
     * The constructor initializes the date property with a Date object, a string, or a number.
     * If the input is invalid, it throws an error.
     *
     * @param date - The date entry that can be either a Date object, a string, or a number.
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
     * The toString method returns the date as a string.

     */
    toISO() {
        return DateUtilities.generateISODateString(this.date);
    }
    /**
     * The toLocaleString method returns the date as a locale string.

     */
    toLocaleString() {
        return DateUtilities.generateLocaleDateString(this.date);
    }
    /**
     * The toUTCString method returns the date as a UTC string.

     */
    toUNIX() {
        return DateUtilities.generateUnixTimestampNumber(this.date);
    }
    /**
     * The toRFC method returns the date as an RFC string.

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