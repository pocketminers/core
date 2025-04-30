/**
 * BaseMessageLevels is an enum that defines various message levels.
 * These levels can be used to categorize messages based on their severity or type.
 */
var BaseMessageLevels;
(function (BaseMessageLevels) {
    BaseMessageLevels["INFO"] = "INFO";
    BaseMessageLevels["WARNING"] = "WARNING";
    BaseMessageLevels["ERROR"] = "ERROR";
    BaseMessageLevels["SUCCESS"] = "SUCCESS";
    BaseMessageLevels["DEBUG"] = "DEBUG";
    BaseMessageLevels["CRITICAL"] = "CRITICAL";
    BaseMessageLevels["TRACE"] = "TRACE";
})(BaseMessageLevels || (BaseMessageLevels = {}));
/**
 * BaseMessageLevelHierarchy is a type that represents the hierarchy of message levels.
 * It is used to define the order of message levels from highest to lowest.
 */
const BaseMessageLevelHierarchy = [
    BaseMessageLevels.CRITICAL,
    BaseMessageLevels.ERROR,
    BaseMessageLevels.WARNING,
    BaseMessageLevels.INFO,
    BaseMessageLevels.SUCCESS,
    BaseMessageLevels.DEBUG,
    BaseMessageLevels.TRACE
];
export { BaseMessageLevelHierarchy, BaseMessageLevels };
//# sourceMappingURL=message.js.map