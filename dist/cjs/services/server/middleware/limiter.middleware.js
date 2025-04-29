"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Rate Limiting Middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500,
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});
exports.limiter = limiter;
//# sourceMappingURL=limiter.middleware.js.map