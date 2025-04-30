var attachServerId = function (id) {
    return function (req, res, next) {
        req.serverId = id;
        next();
    };
};
export { attachServerId };
//# sourceMappingURL=attachments.js.map