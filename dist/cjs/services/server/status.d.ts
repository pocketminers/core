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
/**
 * PocketServerStatus is a type that represents the keys of the PocketServerStatuses enum.
 * It is used to restrict the values to the defined server statuses.
 */
type PocketServerStatus = keyof typeof PocketServerStatuses;
/**
 * PocketServerStatusCodes is an enum that defines the mapping of Pocket server statuses to HTTP status codes.
 * This mapping is used to return appropriate HTTP status codes based on the server status.
 */
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