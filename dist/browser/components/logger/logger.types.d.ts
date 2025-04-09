import { BaseTimestamp } from "../../templates/v0/base/timestamps";
/**
 * LogLevels are the different levels of logging that can be used in the application.
 * They include DEBUG, INFO, WARN, and ERROR.
 * These levels can be used to categorize log messages based on their severity.
 */
declare enum LogLevels {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
/**
 * LogLevel is a type that represents the different levels of logging.
 * It is a string literal type that can be one of the keys of the LogLevels enum.
 */
type LogLevel = keyof typeof LogLevels;
/**
 * LogBookItemEntry represents a single entry in the log book.
 * It includes properties such as level, message, timestamp, context, and data.
 * The level property is of type LogLevel, which can be one of the values defined in the LogLevels enum.
 */
interface LogBookItemEntry<L extends LogLevel = LogLevels.DEBUG, D = Record<string, any>> extends Record<"level", L>, Record<"message", string>, Record<"timestamp", BaseTimestamp>, Record<"context", string>, Record<"data", D> {
}
export { LogLevels, type LogLevel, type LogBookItemEntry };
//# sourceMappingURL=logger.types.d.ts.map