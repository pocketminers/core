"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.adminRouter = router;
router.post('/shutdown', ((req, res) => {
    res.status(200).json({
        message: 'Server is shutting down...',
        request_id: req.header('x-pocket-request-id'),
    });
    setTimeout(() => {
        process.exit(0);
    }, 1000);
}));
//# sourceMappingURL=routes.js.map