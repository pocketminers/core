import { BaseTimestamp, DateEntry } from "@templates/v0/base/timestamps";
import { Checks } from "@utilities/checks";
import { DateUtilities } from "@utilities/date";


/**
 * TimestampItem represents a timestamp item that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
class TimestampItem
    implements
        BaseTimestamp
{
    /**
     * The date property represents the date associated with the timestamp item.
     */
    public readonly date: Date;

    /**
     * The constructor initializes the date property with a Date object, a string, or a number.
     * If the input is invalid, it throws an error.
     *
     * @param date - The date entry that can be either a Date object, a string, or a number.
     */
    public constructor(date: DateEntry = Date.now()) {
        if (
            typeof date === "string"
            || typeof date === "number"
            || date instanceof Date
            && Checks.isEmpty(date) === false
        ) {
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
     *
     * @returns The date as a string.
     */
    public toISO(): string {
        return DateUtilities.generateISODateString(this.date);
    }

    /**
     * The toLocaleString method returns the date as a locale string.
     *
     * @returns The date as a string.
     */
    public toLocaleString(): string {
        return DateUtilities.generateLocaleDateString(this.date);
    }

    /**
     * The toUTCString method returns the date as a UTC string.
     *
     * @returns The date as a string.
     */
    public toUNIX(): number {
        return DateUtilities.generateUnixTimestampNumber(this.date);
    }

    /**
     * The toRFC method returns the date as an RFC string.
     *
     * @returns The date as a string.
     */
    public toRFC(): string {
        return DateUtilities.generateRFCDateString(this.date);
    }

    
    /**
     * The addTime method adds a specified amount of time to the date.
     * It can add years, months, weeks, days, hours, minutes, seconds, and milliseconds.
     */
    public addTime({
        years = 0,
        months = 0,
        weeks = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    }: {
        years?: number,
        months?: number,
        weeks?: number,
        days?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number
    } = {}): TimestampItem {
        const date = DateUtilities.addTime({
            date: this.date,
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
    public subtractTime({
        years = 0,
        months = 0,
        weeks = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    }: {
        years?: number,
        months?: number,
        weeks?: number,
        days?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number
    } = {}): TimestampItem {
        const date = DateUtilities.subtractTime({
            date: this.date,
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

export {
    TimestampItem
}