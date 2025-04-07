enum LogLevels {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}

type LogLevel = keyof typeof LogLevels;


interface LogBookItemEntry
    extends
        Record<"level", LogLevel>,
        Record<"message", string>,
        Record<"timestamp", Date>,
        Record<"context", string>,
        Record<"data", Record<string, any>> {}


export {
    LogLevels,
    type LogLevel,
    type LogBookItemEntry
}