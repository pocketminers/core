import { BaseValueKey, NumberOrEmpty, StringOrEmpty } from "../../v0/base/value";
/**
 * BaseTimestampUnits represents the different units of time that can be used in the Pocket Network.
 * It includes milliseconds, seconds, minutes, hours, days, weeks, months, and years.
 */
declare enum BaseTimestampUnits {
    milliseconds = "milliseconds",
    seconds = "seconds",
    minutes = "minutes",
    hours = "hours",
    days = "days",
    weeks = "weeks",
    months = "months",
    years = "years"
}
/**
 * BaseTimeStampUnit represents the different units of time that can be used in the Pocket Network.
 * It includes milliseconds, seconds, minutes, hours, days, weeks, months, and years.
 */
type BaseTimestampUnit = keyof typeof BaseTimestampUnits;
/**
 * BaseTimestampEntry represents a timestamp entry that can be either a number or a string.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various timestamp-related properties in the Pocket Network.
 */
interface BaseTimestampEntry extends Partial<Record<BaseTimestampUnits.milliseconds, number>>, Partial<Record<BaseTimestampUnits.seconds, number>>, Partial<Record<BaseTimestampUnits.minutes, number>>, Partial<Record<BaseTimestampUnits.hours, number>>, Partial<Record<BaseTimestampUnits.days, number>>, Partial<Record<BaseTimestampUnits.weeks, number>>, Partial<Record<BaseTimestampUnits.months, number>>, Partial<Record<BaseTimestampUnits.years, number>> {
}
/**
 * DateEntry represents a date entry that can be either a Date object, a string, or a number.
 * It can also be an empty string or a number representing a timestamp.
 * This type is used to represent various date-related properties in the Pocket Network.
 */
type DateEntry = Date | StringOrEmpty | NumberOrEmpty;
/**
 * BaseTimeStampTypes represents the different types of timestamps that can be used in the Pocket Network.
 * It includes ISO, UNIX, RFC, and UTC formats.
 */
declare enum BaseTimestampFormats {
    ISO = "ISO",// standard ISO 8601 format as string
    UNIX = "UNIX",// UNIX timestamp as number
    RFC = "RFC",// RFC 2822/UTC format as string
    UTC = "UTC"
}
/**
 * BaseTimeStampType represents the different types of timestamps that can be used in the Pocket Network.
 * It includes ISO, UNIX, RFC, and UTC formats.
 */
type BaseTimestampFormat = keyof typeof BaseTimestampFormats;
/**
 * BaseTimeStampFormat represents the different formats of timestamps that can be used in the Pocket Network.
 * It includes ISO, UNIX, RFC, and UTC formats.
 */
interface BaseTimestamp extends Record<'date', Date> {
}
/**
 * PocketUserAccountTimestamps represents the timestamps associated with a user account.
 * It includes the creation date, last login date, and other relevant timestamps.
 */
interface BaseTimestamps extends Partial<Record<'created', BaseTimestamp>>, Partial<Record<'updated', BaseTimestamp>>, Partial<Record<'lastLogin', BaseTimestamp>>, Partial<Record<'lastActivity', BaseTimestamp>>, Partial<Record<'lastTransaction', BaseTimestamp>>, Partial<Record<BaseValueKey, BaseTimestamp>> {
}
export { type DateEntry, type BaseTimestamp, type BaseTimestampFormat, type BaseTimestamps, type BaseTimestampUnit, type BaseTimestampEntry, BaseTimestampUnits, BaseTimestampFormats };
//# sourceMappingURL=timestamps.d.ts.map