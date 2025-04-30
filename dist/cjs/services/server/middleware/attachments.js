"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachServerId = void 0;
const attachServerId = (id) => {
    return (req, res, next) => {
        req.serverId = id;
        next();
    };
};
exports.attachServerId = attachServerId;
//# sourceMappingURL=attachments.js.map