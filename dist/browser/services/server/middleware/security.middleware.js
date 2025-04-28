var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import { SecretManager } from '../../../utilities/secret.js';
import { Checks } from '../../../utilities/checks.js';
// Configuration
var SHARED_KEY = process.env.POCKET_SHARED_SECRET || "pocketminers-defualt-shared-key-development-purposes-only";
var WHITELIST = ['127.0.0.1'];
var BLACKLIST = ['192.168.1.1'];
// Rate Limiting Middleware
var limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500,
    handler: function (req, res) {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});
// Middleware to check blacklist and whitelist
var checkLists = function (req, res, next) {
    var clientIp = req.ip;
    if (clientIp === null || clientIp === void 0 ? void 0 : clientIp.startsWith('10.')) { }
    if ((clientIp === null || clientIp === void 0 ? void 0 : clientIp.startsWith('192.168.'))
        || (clientIp === null || clientIp === void 0 ? void 0 : clientIp.startsWith('172.'))) {
        res.status(403).json({ message: 'Forbidden' });
    }
    // if (WHITELIST.includes(clientIp)) {
    //     return next();
    // }
    next();
};
function checkForKubeProbe(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if ((_a = req.headers['user-agent']) === null || _a === void 0 ? void 0 : _a.startsWith('kube-probe')) {
                return [2 /*return*/, res.status(200).json({ message: 'OK' })];
            }
            next();
            return [2 /*return*/];
        });
    });
}
// Middleware to encode connections using a shared key
var encodeConnection = function (req, res, next) {
    var _a;
    var hmac = crypto.createHmac('sha256', SHARED_KEY);
    hmac.update(req.headers['if-none-match'] || '');
    if ((_a = req.headers['user-agent']) === null || _a === void 0 ? void 0 : _a.startsWith('kube-probe')) {
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
function checkPublicApiKey(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var publicApiKey, PublicKeyInConfig;
        var _a;
        return __generator(this, function (_b) {
            try {
                if ((_a = req.headers['user-agent']) === null || _a === void 0 ? void 0 : _a.startsWith('kube-probe')) {
                    return [2 /*return*/, next()];
                }
                publicApiKey = req.header('x-pocket-public-api-key');
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
                    return [2 /*return*/, res.status(403).json({ message: 'Forbidden' })];
                }
                PublicKeyInConfig = process.env.POCKET_PUBLIC_API_KEY;
                if ((publicApiKey === null || publicApiKey === void 0 ? void 0 : publicApiKey.startsWith('txt:')) && publicApiKey === ('txt:' + PublicKeyInConfig)) {
                    return [2 /*return*/, next()];
                }
            }
            catch (error) {
                return [2 /*return*/, res.status(500).json({ message: 'Internal Server Error' })];
            }
            next();
            return [2 /*return*/];
        });
    });
}
function checkForAdminRequestHeader(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var adminRequestId, requestId;
        return __generator(this, function (_a) {
            adminRequestId = SecretManager.getSecret('POCKET_ADMIN_SERVICE_REQUEST_ID', { inReact: false });
            requestId = req.header('x-pocket-request-id');
            console.log('adminRequestId: ', adminRequestId);
            console.log('requestId: ', requestId);
            if (Checks.isEmpty(requestId) === false
                && requestId !== adminRequestId) {
                return [2 /*return*/, res.status(403).json({
                        message: 'Admin Request Header Invalid - Forbidden',
                        request_id: requestId,
                    })];
            }
            if (Checks.isEmpty(requestId) === false
                && requestId === adminRequestId) {
                return [2 /*return*/, next()];
            }
            return [2 /*return*/];
        });
    });
}
function checkForShutdownCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var adminShutdownCode, shutdownCode;
        return __generator(this, function (_a) {
            adminShutdownCode = SecretManager.getSecret('POCKET_ADMIN_SERVICE_SHUTDOWN_CODE');
            console.log('adminShutdownCode: ', adminShutdownCode);
            console.log('req.body: ', req.body);
            shutdownCode = req.body['x-pocket-service-shutdown-code'];
            if (Checks.isEmpty(shutdownCode) === false
                && shutdownCode !== adminShutdownCode) {
                return [2 /*return*/, res.status(403).json({
                        message: 'Invalid Shutdown Code - Forbidden',
                        request_id: req.header('x-pocket-request-id'),
                    })];
            }
            if (Checks.isEmpty(shutdownCode) === false
                && shutdownCode === adminShutdownCode) {
                return [2 /*return*/, next()];
            }
            return [2 /*return*/];
        });
    });
}
export { encodeConnection, checkLists, limiter, checkPublicApiKey, checkForKubeProbe, checkForAdminRequestHeader, checkForShutdownCode };
//# sourceMappingURL=security.middleware.js.map