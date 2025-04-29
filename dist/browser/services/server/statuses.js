var PockerServerStatuses;
(function (PockerServerStatuses) {
    PockerServerStatuses["OFFLINE"] = "OFFLINE";
    PockerServerStatuses["ONLINE"] = "ONLINE";
    PockerServerStatuses["INITIALIZING"] = "INITIALIZING";
    PockerServerStatuses["READY"] = "READY";
    PockerServerStatuses["STARTING"] = "STARTING";
    PockerServerStatuses["STOPPING"] = "STOPPING";
    PockerServerStatuses["RESTARTING"] = "RESTARTING";
    PockerServerStatuses["UPDATING"] = "UPDATING";
    PockerServerStatuses["ERROR"] = "ERROR";
})(PockerServerStatuses || (PockerServerStatuses = {}));
var PockerServerStatusCodes;
(function (PockerServerStatusCodes) {
    PockerServerStatusCodes[PockerServerStatusCodes["OFFLINE"] = 503] = "OFFLINE";
    PockerServerStatusCodes[PockerServerStatusCodes["ONLINE"] = 200] = "ONLINE";
    PockerServerStatusCodes[PockerServerStatusCodes["INITIALIZING"] = 202] = "INITIALIZING";
    PockerServerStatusCodes[PockerServerStatusCodes["READY"] = 200] = "READY";
    PockerServerStatusCodes[PockerServerStatusCodes["STARTING"] = 202] = "STARTING";
    PockerServerStatusCodes[PockerServerStatusCodes["STOPPING"] = 202] = "STOPPING";
    PockerServerStatusCodes[PockerServerStatusCodes["RESTARTING"] = 202] = "RESTARTING";
    PockerServerStatusCodes[PockerServerStatusCodes["UPDATING"] = 202] = "UPDATING";
    PockerServerStatusCodes[PockerServerStatusCodes["ERROR"] = 500] = "ERROR";
})(PockerServerStatusCodes || (PockerServerStatusCodes = {}));
export { PockerServerStatuses, PockerServerStatusCodes };
//# sourceMappingURL=statuses.js.map