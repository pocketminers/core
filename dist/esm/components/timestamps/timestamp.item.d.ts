import { BaseTimestamp, BaseTimestampEntry, DateEntry } from "../../templates/v0/base/timestamps";
/**
 * TimestampItem represents a timestamp item that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
declare class TimestampItem implements BaseTimestamp {
    /**
     * The date property represents the date associated with the timestamp item.
     */
    readonly date: Date;
    /**
     * The constructor initializes the date property with a Date object, a string, or a number.
     * If the input is invalid, it throws an error.
     *
     * @param date - The date entry that can be either a Date object, a string, or a number.
     */
    constructor(date?: DateEntry);
    /**
     * The toString method returns the date as a string.

     */
    toISO(): string;
    /**
     * The toLocaleString method returns the date as a locale string.

     */
    toLocaleString(): string;
    /**
     * The toUTCString method returns the date as a UTC string.

     */
    toUNIX(): number;
    /**
     * The toRFC method returns the date as an RFC string.

     */
    toRFC(): string;
    /**
     * The addTime method adds a specified amount of time to the date.
     * It can add years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    addTime({ years, months, weeks, days, hours, minutes, seconds, milliseconds }?: BaseTimestampEntry): TimestampItem;
    /**
     * The subtractTime method subtracts a specified amount of time from the date.
     * It can subtract years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    subtractTime({ years, months, weeks, days, hours, minutes, seconds, milliseconds }?: BaseTimestampEntry): TimestampItem;
}
export { TimestampItem };
//# sourceMappingURL=timestamp.item.d.ts.map