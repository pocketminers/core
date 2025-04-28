"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = exports.checkLists = exports.encodeConnection = void 0;
exports.checkPublicApiKey = checkPublicApiKey;
exports.checkForKubeProbe = checkForKubeProbe;
exports.checkForAdminRequestHeader = checkForAdminRequestHeader;
exports.checkForShutdownCode = checkForShutdownCode;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const crypto_1 = __importDefault(require("crypto"));
const secret_1 = require("../../../utilities/secret.js");
const checks_1 = require("../../../utilities/checks.js");
// Configuration
const SHARED_KEY = process.env.POCKET_SHARED_SECRET || "pocketminers-defualt-shared-key-development-purposes-only";
const WHITELIST = ['127.0.0.1'];
const BLACKLIST = ['192.168.1.1'];
// Rate Limiting Middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500,
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});
exports.limiter = limiter;
// Middleware to check blacklist and whitelist
const checkLists = (req, res, next) => {
    const clientIp = req.ip;
    if (clientIp?.startsWith('10.')) { }
    if (clientIp?.startsWith('192.168.')
        || clientIp?.startsWith('172.')) {
        res.status(403).json({ message: 'Forbidden' });
    }
    // if (WHITELIST.includes(clientIp)) {
    //     return next();
    // }
    next();
};
exports.checkLists = checkLists;
async function checkForKubeProbe(req, res, next) {
    if (req.headers['user-agent']?.startsWith('kube-probe')) {
        return res.status(200).json({ message: 'OK' });
    }
    next();
}
// Middleware to encode connections using a shared key
const encodeConnection = (req, res, next) => {
    const hmac = crypto_1.default.createHmac('sha256', SHARED_KEY);
    hmac.update(req.headers['if-none-match'] || '');
    if (req.headers['user-agent']?.startsWith('kube-probe')) {
        return next();
    }
    // if (req.headers['x-encoded-if-none-match'] !== hmac.digest('hex')) {
    //     res.status(403).json({ message: 'Forbidden' });
    // }
    // req.headers['if-none-match'] = hmac.digest('hex');
    // req.headers['x-encoded-ip'] = hmac.digest('hex');
    // next();
    // console.log('ip: ', req.ip);
    // console.log('headers: ', req.headers);
    next();
};
exports.encodeConnection = encodeConnection;
async function checkPublicApiKey(req, res, next) {
    try {
        if (req.headers['user-agent']?.startsWith('kube-probe')) {
            return next();
        }
        const publicApiKey = req.header('x-pocket-public-api-key');
        if (typeof publicApiKey !== 'string'
            || !publicApiKey
            || publicApiKey === null
            || publicApiKey.length < 1
            || publicApiKey.length > 100
            || publicApiKey.includes(' ')
            || publicApiKey.includes(',')
            || publicApiKey.includes(';')
            || publicApiKey.includes('=')
            // || publicApiKey.includes(':') 
            || publicApiKey.includes('"')
            || publicApiKey.includes("'")) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const PublicKeyInConfig = process.env.POCKET_PUBLIC_API_KEY;
        if (publicApiKey?.startsWith('txt:') && publicApiKey === ('txt:' + PublicKeyInConfig)) {
            return next();
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    next();
}
async function checkForAdminRequestHeader(req, res, next) {
    const adminRequestId = secret_1.SecretManager.getSecret('POCKET_SERVICE_ADMIN_REQUEST_ID', { inReact: false });
    const requestId = req.header('x-pocket-request-id');
    console.log('adminRequestId: ', adminRequestId);
    console.log('requestId: ', requestId);
    if (checks_1.Checks.isEmpty(requestId) === false
        && requestId !== adminRequestId) {
        return res.status(403).json({
            message: 'Admin Request Header Invalid - Forbidden',
            request_id: requestId,
        });
    }
    if (checks_1.Checks.isEmpty(requestId) === false
        && requestId === adminRequestId) {
        return next();
    }
}
async function checkForShutdownCode(req, res, next) {
    const adminShutdownCode = secret_1.SecretManager.getSecret('POCKET_SERVICE_ADMIN_SHUTDOWN_CODE');
    console.log('adminShutdownCode: ', adminShutdownCode);
    console.log('req.body: ', req.body);
    const shutdownCode = req.body['x-pocket-service-shutdown-code'];
    if (checks_1.Checks.isEmpty(shutdownCode) === false
        && shutdownCode !== adminShutdownCode) {
        return res.status(403).json({
            message: 'Invalid Shutdown Code - Forbidden',
            request_id: req.header('x-pocket-request-id'),
        });
    }
    if (checks_1.Checks.isEmpty(shutdownCode) === false
        && shutdownCode === adminShutdownCode) {
        return next();
    }
}
//# sourceMappingURL=security.middleware.js.map