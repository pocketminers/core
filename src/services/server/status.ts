import { BaseInfoCodes, BaseServerErrorCodes, BaseSuccessCodes } from "@templates/v0/base/statuses";

/**
 * PocketServerStatuses is an enum that defines the various statuses of a Pocket server.
 * These statuses can be used to indicate the current state of the server.
 */
enum PocketServerStatuses {
    OFFLINE = 'OFFLINE',
    ONLINE = 'ONLINE',
    INITIALIZING = 'INITIALIZING',
    READY = 'READY',
    STARTING = 'STARTING',
    STOPPING = 'STOPPING',
    RESTARTING = 'RESTARTING',
    UPDATING = 'UPDATING',
    ERROR = 'ERROR'
}

type PocketServerStatus = keyof typeof PocketServerStatuses;

enum PocketServerStatusCodes {
    OFFLINE = BaseServerErrorCodes.SERVICE_UNAVAILABLE,
    ONLINE = BaseSuccessCodes.OK,
    INITIALIZING = BaseInfoCodes.PROCESSING,
    READY = BaseSuccessCodes.OK,
    STARTING = BaseInfoCodes.PROCESSING,
    STOPPING = BaseInfoCodes.PROCESSING,
    RESTARTING = BaseInfoCodes.PROCESSING,
    UPDATING = BaseInfoCodes.PROCESSING,
    ERROR = BaseServerErrorCodes.INTERNAL_SERVER_ERROR
}



export {
    PocketServerStatuses,
    type PocketServerStatus,
    PocketServerStatusCodes
}