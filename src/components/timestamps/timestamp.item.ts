import { BaseTimestamp, DateEntry } from "@templates/v0/base/timestamps";
import { DateUtilities } from "@utilities/date.utilities";

class TimestampItem
    implements
        BaseTimestamp
{
    date: Date;

    constructor(date: DateEntry = Date.now()) {
        if (
            typeof date === "string" ||
            typeof date === "number" ||
            date instanceof Date
        ) {
            this.date = new Date(date);
        }
        else {
            throw new Error("Invalid date entry");
        }
    }

    toISO(): string {
        return DateUtilities.generateISODateString(this.date);
    }

    toLocaleString(): string {
        return DateUtilities.generateLocaleDateString(this.date);
    }

    toUNIX(): number {
        return DateUtilities.generateUnixTimestampNumber(this.date);
    }

    toRFC(): string {
        return DateUtilities.generateRFCDateString(this.date);
    }
}