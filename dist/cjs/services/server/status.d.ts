/**
 * PocketServerStatuses is an enum that defines the various statuses of a Pocket server.
 * These statuses can be used to indicate the current state of the server.
 */
declare enum PocketServerStatuses {
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
    INITIALIZING = "INITIALIZING",
    READY = "READY",
    STARTING = "STARTING",
    STOPPING = "STOPPING",
    RESTARTING = "RESTARTING",
    UPDATING = "UPDATING",
    ERROR = "ERROR"
}
type PocketServerStatus = keyof typeof PocketServerStatuses;
declare enum PocketServerStatusCodes {
    OFFLINE = 503,
    ONLINE = 200,
    INITIALIZING = 102,
    READY = 200,
    STARTING = 102,
    STOPPING = 102,
    RESTARTING = 102,
    UPDATING = 102,
    ERROR = 500
}
export { PocketServerStatuses, type PocketServerStatus, PocketServerStatusCodes };
//# sourceMappingURL=status.d.ts.map