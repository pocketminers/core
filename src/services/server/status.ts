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


/**
 * PocketServerStatus is a type that represents the keys of the PocketServerStatuses enum.
 * It is used to restrict the values to the defined server statuses.
 */
type PocketServerStatus = keyof typeof PocketServerStatuses;


/**
 * PocketServerStatusCodes is an enum that defines the mapping of Pocket server statuses to HTTP status codes.
 * This mapping is used to return appropriate HTTP status codes based on the server status.
 */
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