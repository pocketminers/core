/**
 * PocketServerStatuses is an enum that defines the various statuses of a Pocket server.
 * These statuses can be used to indicate the current state of the server.
 */
var PocketServerStatuses;
(function (PocketServerStatuses) {
    PocketServerStatuses["OFFLINE"] = "OFFLINE";
    PocketServerStatuses["ONLINE"] = "ONLINE";
    PocketServerStatuses["INITIALIZING"] = "INITIALIZING";
    PocketServerStatuses["READY"] = "READY";
    PocketServerStatuses["STARTING"] = "STARTING";
    PocketServerStatuses["STOPPING"] = "STOPPING";
    PocketServerStatuses["RESTARTING"] = "RESTARTING";
    PocketServerStatuses["UPDATING"] = "UPDATING";
    PocketServerStatuses["ERROR"] = "ERROR";
})(PocketServerStatuses || (PocketServerStatuses = {}));
var PocketServerStatusCodes;
(function (PocketServerStatusCodes) {
    PocketServerStatusCodes[PocketServerStatusCodes["OFFLINE"] = 503] = "OFFLINE";
    PocketServerStatusCodes[PocketServerStatusCodes["ONLINE"] = 200] = "ONLINE";
    PocketServerStatusCodes[PocketServerStatusCodes["INITIALIZING"] = 102] = "INITIALIZING";
    PocketServerStatusCodes[PocketServerStatusCodes["READY"] = 200] = "READY";
    PocketServerStatusCodes[PocketServerStatusCodes["STARTING"] = 102] = "STARTING";
    PocketServerStatusCodes[PocketServerStatusCodes["STOPPING"] = 102] = "STOPPING";
    PocketServerStatusCodes[PocketServerStatusCodes["RESTARTING"] = 102] = "RESTARTING";
    PocketServerStatusCodes[PocketServerStatusCodes["UPDATING"] = 102] = "UPDATING";
    PocketServerStatusCodes[PocketServerStatusCodes["ERROR"] = 500] = "ERROR";
})(PocketServerStatusCodes || (PocketServerStatusCodes = {}));
export { PocketServerStatuses, PocketServerStatusCodes };
//# sourceMappingURL=status.js.map