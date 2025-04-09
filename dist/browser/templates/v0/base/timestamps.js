/**
 * BaseTimestampUnits represents the different units of time that can be used in the Pocket Network.
 * It includes milliseconds, seconds, minutes, hours, days, weeks, months, and years.
 */
var BaseTimestampUnits;
(function (BaseTimestampUnits) {
    BaseTimestampUnits["milliseconds"] = "milliseconds";
    BaseTimestampUnits["seconds"] = "seconds";
    BaseTimestampUnits["minutes"] = "minutes";
    BaseTimestampUnits["hours"] = "hours";
    BaseTimestampUnits["days"] = "days";
    BaseTimestampUnits["weeks"] = "weeks";
    BaseTimestampUnits["months"] = "months";
    BaseTimestampUnits["years"] = "years";
})(BaseTimestampUnits || (BaseTimestampUnits = {}));
/**
 * BaseTimeStampTypes represents the different types of timestamps that can be used in the Pocket Network.
 * It includes ISO, UNIX, RFC, and UTC formats.
 */
var BaseTimestampFormats;
(function (BaseTimestampFormats) {
    BaseTimestampFormats["ISO"] = "ISO";
    BaseTimestampFormats["UNIX"] = "UNIX";
    BaseTimestampFormats["RFC"] = "RFC";
    BaseTimestampFormats["UTC"] = "UTC";
})(BaseTimestampFormats || (BaseTimestampFormats = {}));
export { BaseTimestampUnits, BaseTimestampFormats };
//# sourceMappingURL=timestamps.js.map