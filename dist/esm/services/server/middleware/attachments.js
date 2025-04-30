const attachServerId = (id) => {
    return (req, res, next) => {
        req.serverId = id;
        next();
    };
};
export { attachServerId };
//# sourceMappingURL=attachments.js.map