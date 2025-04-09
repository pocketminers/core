"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampItem = void 0;
const checks_1 = require("../../utilities/checks");
const date_1 = require("../../utilities/date");
/**
 * TimestampItem represents a timestamp item that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
class TimestampItem {
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
                && checks_1.Checks.isEmpty(date) === false) {
            this.date = new Date(date);
        }
        else {
            throw new Error("Invalid date entry");
        }
        Object.freeze(this);
        Object.freeze(this.date);
    }
    /**
     * The toString method returns the date as a string.

     */
    toISO() {
        return date_1.DateUtilities.generateISODateString(this.date);
    }
    /**
     * The toLocaleString method returns the date as a locale string.

     */
    toLocaleString() {
        return date_1.DateUtilities.generateLocaleDateString(this.date);
    }
    /**
     * The toUTCString method returns the date as a UTC string.

     */
    toUNIX() {
        return date_1.DateUtilities.generateUnixTimestampNumber(this.date);
    }
    /**
     * The toRFC method returns the date as an RFC string.

     */
    toRFC() {
        return date_1.DateUtilities.generateRFCDateString(this.date);
    }
    /**
     * The addTime method adds a specified amount of time to the date.
     * It can add years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    addTime({ years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
        const date = date_1.DateUtilities.addTime(this.date, {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        });
        return new TimestampItem(date);
    }
    /**
     * The subtractTime method subtracts a specified amount of time from the date.
     * It can subtract years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    subtractTime({ years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
        const date = date_1.DateUtilities.subtractTime(this.date, {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        });
        return new TimestampItem(date);
    }
}
exports.TimestampItem = TimestampItem;
//# sourceMappingURL=timestamp.item.js.map