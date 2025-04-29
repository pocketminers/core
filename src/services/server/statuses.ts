enum PockerServerStatuses {
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

enum PockerServerStatusCodes {
    OFFLINE = 503,
    ONLINE = 200,
    INITIALIZING = 202,
    READY = 200,
    STARTING = 202,
    STOPPING = 202,
    RESTARTING = 202,
    UPDATING = 202,
    ERROR = 500
}


type PocketServerStatus = keyof typeof PockerServerStatuses;

export {
    type PocketServerStatus,
    PockerServerStatuses,
    PockerServerStatusCodes
}