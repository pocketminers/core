import { Checks } from "../../utilities/checks.js";
import { DateUtilities } from "../../utilities/date.js";
import { Freezer } from "../../utilities/freezer.js";
/**
 * PocketTimestamp represents a timestamp item that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
var PocketTimestamp = /** @class */ (function () {
    /**
     * The constructor initializes the date property with a Date object, a string, or a number.
     * If the input is invalid, it throws an error.
     *
     * @param date - The date entry that can be either a Date object, a string, or a number.
     */
    function PocketTimestamp(date) {
        if (date === void 0) { date = Date.now(); }
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
    PocketTimestamp.prototype.toISO = function () {
        return DateUtilities.generateISODateString(this.date);
    };
    /**
     * The toLocaleString method returns the date as a locale string.

     */
    PocketTimestamp.prototype.toLocaleString = function () {
        return DateUtilities.generateLocaleDateString(this.date);
    };
    /**
     * The toUTCString method returns the date as a UTC string.

     */
    PocketTimestamp.prototype.toUNIX = function () {
        return DateUtilities.generateUnixTimestampNumber(this.date);
    };
    /**
     * The toRFC method returns the date as an RFC string.

     */
    PocketTimestamp.prototype.toRFC = function () {
        return DateUtilities.generateRFCDateString(this.date);
    };
    /**
     * The addTime method adds a specified amount of time to the date.
     * It can add years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    PocketTimestamp.prototype.addTime = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.years, years = _c === void 0 ? 0 : _c, _d = _b.months, months = _d === void 0 ? 0 : _d, _e = _b.weeks, weeks = _e === void 0 ? 0 : _e, _f = _b.days, days = _f === void 0 ? 0 : _f, _g = _b.hours, hours = _g === void 0 ? 0 : _g, _h = _b.minutes, minutes = _h === void 0 ? 0 : _h, _j = _b.seconds, seconds = _j === void 0 ? 0 : _j, _k = _b.milliseconds, milliseconds = _k === void 0 ? 0 : _k;
        var date = DateUtilities.addTime(this.date, {
            years: years,
            months: months,
            weeks: weeks,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
        });
        return new PocketTimestamp(date);
    };
    /**
     * The subtractTime method subtracts a specified amount of time from the date.
     * It can subtract years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    PocketTimestamp.prototype.subtractTime = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.years, years = _c === void 0 ? 0 : _c, _d = _b.months, months = _d === void 0 ? 0 : _d, _e = _b.weeks, weeks = _e === void 0 ? 0 : _e, _f = _b.days, days = _f === void 0 ? 0 : _f, _g = _b.hours, hours = _g === void 0 ? 0 : _g, _h = _b.minutes, minutes = _h === void 0 ? 0 : _h, _j = _b.seconds, seconds = _j === void 0 ? 0 : _j, _k = _b.milliseconds, milliseconds = _k === void 0 ? 0 : _k;
        var date = DateUtilities.subtractTime(this.date, {
            years: years,
            months: months,
            weeks: weeks,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
        });
        return new PocketTimestamp(date);
    };
    PocketTimestamp.createTimestamp = function (date) {
        if (date === void 0) { date = new Date(); }
        return new PocketTimestamp(date);
    };
    return PocketTimestamp;
}());
export { PocketTimestamp };
//# sourceMappingURL=timestamp.js.map